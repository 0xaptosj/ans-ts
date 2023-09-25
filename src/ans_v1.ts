import { createClient } from "@thalalabs/surf";
import { Provider, type Network, AptosAccount } from "aptos";
import { ABI } from "./v1_abi";
import { Client } from "@thalalabs/surf/build/types/core/Client";

type Option<T> = { vec: [T] | [] };

export class ANS {
  provider: Provider;
  client: ReturnType<typeof createClient>;
  account?: AptosAccount;
  accountAddr?: `0x${string}`;

  constructor(
    readonly network: "testnet" | "mainnet",
    readonly privateKeyHex?: string
  ) {
    this.provider = new Provider(process.env.NETWORK as Network);
    this.client = createClient({
      nodeUrl: this.provider.aptosClient.nodeUrl,
    });
    if (privateKeyHex) {
      this.account = AptosAccount.fromAptosAccountObject({
        privateKeyHex,
      });
      this.accountAddr = this.account.address().hex() as `0x${string}`;
    }
  }

  async registerSubdomain(
    domain: string,
    subdomain: string,
    expirationTimeSecs: number,
  ) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.register_subdomain({
      type_arguments: [],
      arguments: [
        subdomain,
        domain,
        expirationTimeSecs,
        // domain,
        // subdomain,
        // expirationTimeSecs,
        // expirationPolicy,
        // transferable,
        // targetAddr ? [targetAddr] : [],
        // toAddr ? [toAddr] : [],
      ],
      account: this.account,
    });
  }

  async initReverseRegistry() {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.init_reverse_lookup_registry_v1({
      type_arguments: [],
      arguments: [],
      account: this.account,
    });
  }

  async getPrimaryName() {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).view.get_reverse_lookup({
      type_arguments: [],
      arguments: [this.accountAddr!],
    });
  }
}
