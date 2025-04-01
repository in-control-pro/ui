import fs from 'node:fs';
import path from 'node:path';

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/components/ui/*.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.js',
    };
  },
  loader: {
    '.css': 'copy',
  },
  async onSuccess() {
    await new Promise<void>((resolve) => {
      const stylesDir = path.join(__dirname, 'dist/styles');
      if (!fs.existsSync(stylesDir)) {
        fs.mkdirSync(stylesDir, { recursive: true });
      }
      fs.copyFileSync(
        path.join(__dirname, 'src/styles/globals.css'),
        path.join(__dirname, 'dist/styles/globals.css')
      );
      resolve();
    });
  },
});
