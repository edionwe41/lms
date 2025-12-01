declare module 'lovable-tagger' {
  import type { Plugin } from 'vite';

  /**
   * Vite plugin that tags React components for development/debugging.
   * 
   * When running in development mode (LOVABLE_DEV_SERVER=true), it:
   * - Processes the project's tailwind.config.ts
   * - Generates src/tailwind.config.lov.json with resolved Tailwind config
   * - Watches tailwind config changes and regenerates on updates
   * 
   * Takes no arguments and returns a standard Vite Plugin.
   * 
   * @example
   * // vite.config.ts
   * import { componentTagger } from 'lovable-tagger';
   * 
   * export default defineConfig(({ mode }) => ({
   *   plugins: [
   *     react(),
   *     mode === "development" && componentTagger()
   *   ].filter(Boolean),
   * }));
   */
  export function componentTagger(): Plugin;
}
