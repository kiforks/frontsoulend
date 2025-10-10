/**
 * @deprecated
 * TODO (TypeScript only): Replace `vitest.workspace.ts` with a unified `vitest.config.ts`
 * once Nx fixes the issue where the root project is incorrectly inferred from `package.json`
 * due to existing "name" and "test" fields when `vitest.config.ts` is located in the root.
 *
 * After the Nx fix, use the following TypeScript configuration:
 * ```ts
 * import { defineConfig } from 'vitest/config';
 *
 * export default defineConfig({
 * 	test: {
 * 		projects: [...]
 * });
 *```
 */
export default ['**/*/vite.config.{ts,mts}', '**/*/vitest.config.{ts,mts}'];
