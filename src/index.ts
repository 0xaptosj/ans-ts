import "dotenv/config";
import { createClient, createEntryPayload } from "@thalalabs/surf";
import { Provider, type Network, AptosAccount } from "aptos";
import { ABI } from "./abi";

type Option<T> = [{ vec: [T] | [] }];

if (!process.env.NETWORK) throw new Error("NETWORK not set");
else if (process.env.NETWORK !== "testnet" && process.env.NETWORK !== "mainnet")
  throw new Error("NETWORK must be testnet or mainnet");
else if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY not set");

const provider = new Provider(process.env.NETWORK as Network);
const client = createClient({
  nodeUrl: provider.aptosClient.nodeUrl,
}).useABI(ABI);
const account = AptosAccount.fromAptosAccountObject({
  privateKeyHex: process.env.PRIVATE_KEY,
});
const accountAddr = account.address();
const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;

// Configurables
const DOMAIN = "testdomain";
const SUBDOMAIN = "test";

const main = async () => {
  {
    const mode = await client.view.get_mode({
      arguments: [],
      type_arguments: [],
    });
    console.log(`Router mode: ${mode}`);
  }

  // Register domain
  {
    try {
      const res = await client.entry.register_domain({
        type_arguments: [],
        arguments: [DOMAIN, SECONDS_PER_YEAR, [], []],
        account,
      });
      console.log(`Domain registration success: ${res.hash}`);
    } catch (e) {
      console.error(e);
    }
  }

  // Register subdomain
  {
    const IN_HALF_YEAR = Math.floor(Date.now() / 1000) + SECONDS_PER_YEAR / 2;
    try {
      const res = await client.entry.register_subdomain({
        type_arguments: [],
        arguments: [DOMAIN, SUBDOMAIN, IN_HALF_YEAR, 0, false, [], []],
        account,
      });
      console.log(`Subdomain registration success: ${res.hash}`);
    } catch (e) {
      console.error(e);
    }
  }

  {
    const targetAddr = (await client.view.get_target_addr({
      arguments: [DOMAIN, { vec: [] } as any],
      type_arguments: [],
    })) as Option<string>;
    console.log(`${DOMAIN}.apt target address: ${targetAddr[0].vec[0]}`);
  }

  {
    const targetAddr = (await client.view.get_target_addr({
      arguments: [DOMAIN, { vec: [SUBDOMAIN] } as any],
      type_arguments: [],
    })) as Option<string>;
    console.log(
      `${SUBDOMAIN}.${DOMAIN}.apt target address: ${targetAddr[0].vec[0]}`
    );
  }
};

main().catch(console.error);
