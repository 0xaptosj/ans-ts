#! /bin/bash

NETWORK="testnet"
ROUTER_ADDR=0x49b4c7efac4dff17b267191200054b7a3b736db3cd364552edb202ea3cb45884
PRIVATE_KEY=0xe567dbcf809d50976d31b7490eedd2b6a79c4e5a8c78a0a00034c98842b2c660
ROUTER_PRIVATE_KEY=0xe567dbcf809d50976d31b7490eedd2b6a79c4e5a8c78a0a00034c98842b2c660

# echo $NETWORK
# echo $ROUTER_ADDR

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/router | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/router_abi.ts

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/domains | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/v1_abi.ts

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/v2_domains | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/v2_abi.ts

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/migrate | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/bulk_migrate_abi.ts

# echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/aptos_names )"
# echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/domains | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/v1_abi.ts
