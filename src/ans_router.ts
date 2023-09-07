import { createClient } from "@thalalabs/surf";
import { Provider, type Network, AptosAccount } from "aptos";
import { Client } from "@thalalabs/surf/build/types/core/Client";
import { ABI } from "./router_abi";

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

  async registerDomain(
    domain: string,
    duration: number,
    targetAddr?: `0x${string}`,
    toAddr?: `0x${string}`
  ) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.register_domain({
      type_arguments: [],
      arguments: [
        domain,
        duration,
        targetAddr ? [targetAddr] : [],
        toAddr ? [toAddr] : [],
      ],
      account: this.account,
    });
  }

  async renewDomain(domain: string, duration: number) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.renew_domain({
      type_arguments: [],
      arguments: [domain, duration],
      account: this.account,
    });
  }

  async registerSubdomain(
    domain: string,
    subdomain: string,
    expirationTimeSecs: number,
    expirationPolicy: number,
    transferable: boolean,
    targetAddr?: `0x${string}`,
    toAddr?: `0x${string}`
  ) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.register_subdomain({
      type_arguments: [],
      arguments: [
        domain,
        subdomain,
        expirationTimeSecs,
        expirationPolicy,
        transferable,
        targetAddr ? [targetAddr] : [],
        toAddr ? [toAddr] : [],
      ],
      account: this.account,
    });
  }

  async migrateName(domain: string, subdomain?: string) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.migrate_name({
      type_arguments: [],
      arguments: [domain, subdomain ? [subdomain] : []],
      account: this.account,
    });
  }

  async setPrimaryName(domain: string, subdomain?: string) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.set_primary_name({
      type_arguments: [],
      arguments: [domain, subdomain ? [subdomain] : []],
      account: this.account,
    });
  }

  async clearPrimaryName() {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.clear_primary_name({
      type_arguments: [],
      arguments: [],
      account: this.account,
    });
  }

  async getPrimaryName(accountAddr: `0x${string}`) {
    const [primaryNameSubdomain, primaryNameDomain] = (await this.client
      .useABI(ABI)
      .view.get_primary_name({
        type_arguments: [],
        arguments: [accountAddr],
      })) as [Option<string>, Option<string>];
    return {
      primaryNameSubdomain: primaryNameSubdomain.vec[0] || null,
      primaryNameDomain: primaryNameDomain.vec[0] || null,
    };
  }

  async setTargetAddr(
    domain: string,
    subdomain: string | undefined,
    targetAddr: `0x${string}`
  ) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.set_target_addr({
      type_arguments: [],
      arguments: [domain, subdomain ? [subdomain] : [], targetAddr],
      account: this.account,
    });
  }

  async clearTargetAddr(domain: string, subdomain?: string) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.clear_target_addr({
      type_arguments: [],
      arguments: [domain, subdomain ? [subdomain] : []],
      account: this.account,
    });
  }

  async getTargetAddr(domain: string, subdomain?: string) {
    const targetAddr = (await this.client.useABI(ABI).view.get_target_addr({
      arguments: [
        domain,
        subdomain ? { vec: [subdomain] } : ({ vec: [] } as any),
      ],
      type_arguments: [],
    })) as [Option<string>];
    return targetAddr[0].vec[0] || null;
  }

  async getExpiration(domain: string, subdomain?: string) {
    const expiration = await this.client.useABI(ABI).view.get_expiration({
      arguments: [
        domain,
        subdomain ? { vec: [subdomain] } : ({ vec: [] } as any),
      ],
      type_arguments: [],
    });
    return Number(expiration[0]);
  }

  // ADMIN

  async getRouterMode() {
    const mode = await this.client.useABI(ABI).view.get_mode({
      arguments: [],
      type_arguments: [],
    });
    return Number(mode);
  }

  async setRouterMode(mode: number) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.set_mode({
      type_arguments: [],
      arguments: [mode],
      account: this.account,
    });
  }
}
