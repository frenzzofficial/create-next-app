@AGENTS.md

## Claude Code session workflow

- Before editing anything under a folder covered by the stage table in
  AGENTS.md, read that stage's doc in `src/docs/dev/` first — it explains
  the "why," not just the "what."
- Before finishing any task that touched `.ts`/`.tsx`/`.css` files, run:

  ```bash
  bun run verify
  ```

  (lint + format + check + typecheck). A change that compiles but fails
  `biome check` isn't done — fix it in the same session rather than
  leaving it for the next one.
- If a change touches anything CSS-related, remember: this project's
  tokens are OKLCH, not HSL — see the landmines section in AGENTS.md
  before writing `hsl(...)` anywhere.
- Prefer extending an existing pattern (see `packages/utils`,
  `packages/schemas` for examples of the established shape) over
  introducing a new one for the same kind of problem.
