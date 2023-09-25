import "dotenv/config";
import { ANS as AnsRouter } from "./ans_router";
import { ANS as AnsV1 } from "./ans_v1";
import { ANS as AnsV2 } from "./ans_v2";
// import { ANS as BulkMigrate } from "./bulk_migrate";

import { AptosAccount } from "aptos";

if (!process.env.NETWORK) throw new Error("NETWORK not set");
else if (process.env.NETWORK !== "testnet" && process.env.NETWORK !== "mainnet")
  throw new Error("NETWORK must be testnet or mainnet");
else if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY not set");

const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;

const ansV1 = new AnsV1(process.env.NETWORK, process.env.PRIVATE_KEY);
const ansV2 = new AnsV2(process.env.NETWORK, process.env.PRIVATE_KEY);
const ansRouter = new AnsRouter(
  process.env.NETWORK,
  // process.env.ROUTER_PRIVATE_KEY
  process.env.PRIVATE_KEY
);
// const bulkMigrate = new BulkMigrate(
//   process.env.NETWORK,
//   process.env.PRIVATE_KEY
// );

const account = AptosAccount.fromAptosAccountObject({
  privateKeyHex: process.env.PRIVATE_KEY,
});
const accountAddr = account.address().hex() as `0x${string}`;

// Configurables
const DOMAIN = "testdomain3";
// const DOMAIN = "hellofoivfm";
const SUBDOMAIN = "sub1";

const printTargetAddrs = async () => {
  {
    const targetAddr = await ansRouter.getTargetAddr(DOMAIN);
    console.log(`${DOMAIN}.apt target address: ${targetAddr}`);
  }
  {
    const targetAddr = await ansRouter.getTargetAddr(DOMAIN, SUBDOMAIN);
    console.log(`${SUBDOMAIN}.${DOMAIN}.apt target address: ${targetAddr}`);
  }
};

const main = async () => {
  // await printTargetAddrs();

  {
    const mode = await ansRouter.getRouterMode();
    console.log(`Router mode before: ${mode}`);
  }

  {
    const mode = await ansRouter.setRouterMode(1);
    console.log(`Router mode: ${mode}`);
  }

  {
    const mode = await ansRouter.getRouterMode();
    console.log(`Router mode after: ${mode}`);
  }

  // {
  //   try {
  //     const res = await ansV1.initReverseRegistry();
  //     console.log(`${DOMAIN} registration success: ${res.hash}`);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // {
  //   try {
  //     const res = await ansRouter.registerDomain(DOMAIN, SECONDS_PER_YEAR);
  //     console.log(`${DOMAIN} registration success: ${res.hash}`);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // {
  //   const { primaryNameSubdomain, primaryNameDomain } =
  //     await ansRouter.getPrimaryName(accountAddr);
  //   console.log(
  //     `${accountAddr} router primary name: ${[
  //       ...(primaryNameSubdomain ? [primaryNameSubdomain] : []),
  //       ...(primaryNameDomain ? [primaryNameDomain] : []),
  //     ].join(".")}.apt`
  //   );
  // }

  // {
  //   const result = await ansV1.getPrimaryName();
  //   console.log(
  //     `${accountAddr} v1 primary name: ${JSON.stringify(result)}.apt`
  //   );
  // }

  // {
  //   const result = await ansV2.getPrimaryName();
  //   console.log(
  //     `${accountAddr} v2 primary name: ${JSON.stringify(result)}.apt`
  //   );
  // }

  // {
  //   const IN_HALF_YEAR = Math.floor(Date.now() / 1000) + SECONDS_PER_YEAR / 2;
  //   try {
  //     const res = await ansRouter.registerSubdomain(
  //       DOMAIN,
  //       SUBDOMAIN,
  //       IN_HALF_YEAR,
  //       0,
  //       false
  //     );
  //     console.log(`${SUBDOMAIN}.${DOMAIN} registration success: ${res.hash}`);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // {
  //   try {
  //     const res = await bulkMigrate.bulkMigrate();
  //     console.log(`${SUBDOMAIN}.${DOMAIN} registration success: ${res.hash}`);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // {
  //   const IN_HALF_YEAR = Math.floor(Date.now() / 1000) + SECONDS_PER_YEAR / 2;
  //   try {
  //     const res = await ansV1.registerSubdomain(
  //       DOMAIN,
  //       SUBDOMAIN,
  //       IN_HALF_YEAR,
  //     );
  //     console.log(`${SUBDOMAIN}.${DOMAIN} registration success: ${res.hash}`);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // {
  //   const IN_HALF_YEAR = Math.floor(Date.now() / 1000) + SECONDS_PER_YEAR / 2;
  //   try {
  //     const res = await ansV1.registerSubdomain(
  //       DOMAIN,
  //       SUBDOMAIN,
  //       IN_HALF_YEAR,
  //     );
  //     console.log(`${SUBDOMAIN}.${DOMAIN} registration success: ${res.hash}`);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // {
  //   try {
  //     const res = await ansRouter.setPrimaryName(DOMAIN, SUBDOMAIN);
  //     console.log(
  //       `Set primary name to ${SUBDOMAIN}.${DOMAIN}.apt success: ${res.hash}`
  //     );
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // {
  //   const targetAddr = "0x1";
  //   try {
  //     const res = await ansRouter.setTargetAddr(DOMAIN, SUBDOMAIN, targetAddr);
  //     console.log(
  //       `Set target address for ${SUBDOMAIN}.${DOMAIN}.apt to ${targetAddr} success: ${res.hash}`
  //     );
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
  // await printTargetAddrs();

  // {
  //   const { primaryNameSubdomain, primaryNameDomain } =
  //     await ans.getPrimaryName(accountAddr);
  //   console.log(
  //     `${accountAddr} primary name: ${[
  //       ...(primaryNameSubdomain ? [primaryNameSubdomain] : []),
  //       ...(primaryNameDomain ? [primaryNameDomain] : []),
  //     ].join(".")}.apt`
  //   );
  // }

  //   {
  //     try {
  //       const res = await ans.clearPrimaryName();
  //       console.log(`Clear primary name success: ${res.hash}`);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }

  //   {
  //     const { primaryNameSubdomain, primaryNameDomain } =
  //       await ans.getPrimaryName(accountAddr);
  //     console.log(
  //       `${accountAddr} primary name: ${[
  //         ...(primaryNameSubdomain ? [primaryNameSubdomain] : []),
  //         ...(primaryNameDomain ? [primaryNameDomain] : []),
  //       ].join(".")}.apt`
  //     );
  //   }

  // {
  //   try {
  //     const res = await ans.clearTargetAddr(DOMAIN, SUBDOMAIN);
  //     console.log(`Clear target address success: ${res.hash}`);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  //   // Toggle mode
  //   //   {
  //   //     try {
  //   //       const res = await routerAns.setRouterMode(0);
  //   //       console.log(`Set router mode to v1 success: ${res.hash}`);
  //   //     } catch (e) {
  //   //       console.error(e);
  //   //     }
  //   //   }
  //   //   {
  //   //     try {
  //   //       const res = await routerAns.setRouterMode(1);
  //   //       console.log(`Set router mode to v2 success: ${res.hash}`);
  //   //     } catch (e) {
  //   //       console.error(e);
  //   //     }
  //   //   }

  //   {
  //     try {
  //       const res = await ans.renewDomain(DOMAIN, SECONDS_PER_YEAR);
  //       console.log(`Renew domain success: ${res.hash}`);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   await printExpirations();

  //   {
  //     try {
  //       const res = await ans.migrateName(DOMAIN);
  //       console.log(`Migrate ${DOMAIN}.apt success: ${res.hash}`);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }

  //   {
  //     try {
  //       const res = await ans.migrateName(DOMAIN, SUBDOMAIN);
  //       console.log(`Migrate ${SUBDOMAIN}.${DOMAIN}.apt success: ${res.hash}`);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // };

  // const printExpirations = async () => {
  //   {
  //     const expiration = await ans.getExpiration(DOMAIN);
  //     console.log(`${DOMAIN}.apt expiration: ${new Date(expiration * 1000)}`);
  //   }
  //   {
  //     const expiration = await ans.getExpiration(DOMAIN, SUBDOMAIN);
  //     console.log(
  //       `${SUBDOMAIN}.${DOMAIN}.apt expiration: ${new Date(expiration * 1000)}`
  //     );
  //   }
};

main().catch(console.error);
