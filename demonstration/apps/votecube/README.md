# Votecube (Svelte 5)

Svelte 5 rewrite of `votecube.com/apps/public-ui`. Shared libraries live in `../../libs`.

    pnpm install
    pnpm --filter "./libs/*" build   # builds the TypeScript libraries
    pnpm dev

`@airport/*` and `@votecube/votecube` are linked from sibling checkouts via `pnpm.overrides` in the root `package.json` (paths are relative to this workspace).
