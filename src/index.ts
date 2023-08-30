import "dotenv/config";
import { createClient } from "@thalalabs/surf";
import { Provider, type Network, AptosAccount } from "aptos";
import { ABI } from "./abi";
import { ANS } from "./ans";

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
const accountAddr = account.address().hex() as `0x${string}`;
const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
const ans = new ANS(process.env.NETWORK, process.env.PRIVATE_KEY);

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

  {
    try {
      const res = await ans.registerDomain(DOMAIN, SECONDS_PER_YEAR);
      console.log(`${DOMAIN} registration success: ${res.hash}`);
    } catch (e) {
      console.error(e);
    }
  }

  {
    const IN_HALF_YEAR = Math.floor(Date.now() / 1000) + SECONDS_PER_YEAR / 2;
    try {
      const res = await ans.registerSubdomain(
        DOMAIN,
        SUBDOMAIN,
        IN_HALF_YEAR,
        0,
        false
      );
      console.log(`${SUBDOMAIN}.${DOMAIN} registration success: ${res.hash}`);
    } catch (e) {
      console.error(e);
    }
  }

  {
    try {
      const res = await ans.setPrimaryName(DOMAIN, SUBDOMAIN);
      console.log(
        `Set primary name to ${SUBDOMAIN}.${DOMAIN}.apt success: ${res.hash}`
      );
    } catch (e) {
      console.error(e);
    }
  }

  {
    const targetAddr = "0x1";
    try {
      const res = await ans.setTargetAddr(DOMAIN, SUBDOMAIN, targetAddr);
      console.log(
        `Set target address for ${SUBDOMAIN}.${DOMAIN}.apt to ${targetAddr} success: ${res.hash}`
      );
    } catch (e) {
      console.error(e);
    }
  }
  await printTargetAddrs();

  {
    const { primaryNameSubdomain, primaryNameDomain } =
      await ans.getPrimaryName(accountAddr);
    console.log(
      `${accountAddr} primary name: ${[
        ...(primaryNameSubdomain ? [primaryNameSubdomain] : []),
        ...(primaryNameDomain ? [primaryNameDomain] : []),
      ].join(".")}.apt`
    );
  }

  {
    try {
      const res = await ans.clearPrimaryName();
      console.log(`Clear primary name success: ${res.hash}`);
    } catch (e) {
      console.error(e);
    }
  }

  {
    const { primaryNameSubdomain, primaryNameDomain } =
      await ans.getPrimaryName(accountAddr);
    console.log(
      `${accountAddr} primary name: ${[
        ...(primaryNameSubdomain ? [primaryNameSubdomain] : []),
        ...(primaryNameDomain ? [primaryNameDomain] : []),
      ].join(".")}.apt`
    );
  }

  {
    try {
      const res = await ans.clearTargetAddr(DOMAIN, SUBDOMAIN);
      console.log(`Clear target address success: ${res.hash}`);
    } catch (e) {
      console.error(e);
    }
  }
  await printTargetAddrs();

  {
    try {
      const res = await ans.renewDomain(DOMAIN, SECONDS_PER_YEAR);
      console.log(`Renew domain success: ${res.hash}`);
    } catch (e) {
      console.error(e);
    }
  }
  await printExpirations();

  {
    try {
      const res = await ans.migrateName(DOMAIN);
      console.log(`Migrate ${DOMAIN}.apt success: ${res.hash}`);
    } catch (e) {
      console.error(e);
    }
  }

  {
    try {
      const res = await ans.migrateName(DOMAIN, SUBDOMAIN);
      console.log(`Migrate ${SUBDOMAIN}.${DOMAIN}.apt success: ${res.hash}`);
    } catch (e) {
      console.error(e);
    }
  }
};

const printTargetAddrs = async () => {
  {
    const targetAddr = await ans.getTargetAddr(DOMAIN);
    console.log(`${DOMAIN}.apt target address: ${targetAddr}`);
  }
  {
    const targetAddr = await ans.getTargetAddr(DOMAIN, SUBDOMAIN);
    console.log(`${SUBDOMAIN}.${DOMAIN}.apt target address: ${targetAddr}`);
  }
};

const printExpirations = async () => {
  {
    const expiration = await ans.getExpiration(DOMAIN);
    console.log(`${DOMAIN}.apt expiration: ${new Date(expiration * 1000)}`);
  }
  {
    const expiration = await ans.getExpiration(DOMAIN, SUBDOMAIN);
    console.log(
      `${SUBDOMAIN}.${DOMAIN}.apt expiration: ${new Date(expiration * 1000)}`
    );
  }
};

main().catch(console.error);
