#! /bin/bash

export $(cat .env | xargs) && echo "export const ABI = $(curl https://fullnode.$REACT_APP_NETWORK.aptoslabs.com/v1/accounts/$ROUTER_ADDR/module/router | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/abi.ts