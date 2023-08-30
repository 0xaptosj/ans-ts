# ans-ts

Basic scripts for ANS

## Setup

```
pnpm i
cp .env.example .env
```

Make sure to assign `PRIVATE_KEY`

To run `src/index.ts`, just do

```
pnpm run start
```

## Router

If you want to use a different router, you should update `ROUTER_ADDR` in your .env and rerun ABI gen

```
pnpm run gen
```