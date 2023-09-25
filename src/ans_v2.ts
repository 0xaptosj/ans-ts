import { createClient } from "@thalalabs/surf";
import { Provider, type Network, AptosAccount } from "aptos";
import { ABI } from "./v2_abi";
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

  async getPrimaryName() {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).view.get_reverse_lookup({
      type_arguments: [],
      arguments: [this.accountAddr!],
    });
  }
}
