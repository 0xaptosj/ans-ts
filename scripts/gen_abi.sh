#! /bin/bash


# echo $NETWORK
# echo $ROUTER_ADDR

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/router | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/router_abi.ts

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/domains | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/v1_abi.ts

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/v2_1_domains | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/v2_abi.ts

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/migrate | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/bulk_migrate_abi.ts

# echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/aptos_names )"
# echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/domains | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/v1_abi.ts
