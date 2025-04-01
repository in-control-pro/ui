import fs from 'fs/promises';
import path from 'path';

import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'components/ui/accordion': 'src/components/ui/accordion.tsx',
    'components/ui/alert': 'src/components/ui/alert.tsx',
    'components/ui/alert-dialog': 'src/components/ui/alert-dialog.tsx',
    'components/ui/aspect-ratio': 'src/components/ui/aspect-ratio.tsx',
    'components/ui/avatar': 'src/components/ui/avatar.tsx',
    'components/ui/badge': 'src/components/ui/badge.tsx',
    'components/ui/button': 'src/components/ui/button.tsx',
    'components/ui/calendar': 'src/components/ui/calendar.tsx',
    'components/ui/card': 'src/components/ui/card.tsx',
    'components/ui/checkbox': 'src/components/ui/checkbox.tsx',
    'components/ui/command': 'src/components/ui/command.tsx',
    'components/ui/dialog': 'src/components/ui/dialog.tsx',
    'components/ui/dropdown-menu': 'src/components/ui/dropdown-menu.tsx',
    'components/ui/form': 'src/components/ui/form.tsx',
    'components/ui/input': 'src/components/ui/input.tsx',
    'components/ui/label': 'src/components/ui/label.tsx',
    'components/ui/navigation-menu': 'src/components/ui/navigation-menu.tsx',
    'components/ui/popover': 'src/components/ui/popover.tsx',
    'components/ui/select': 'src/components/ui/select.tsx',
    'components/ui/sidebar': 'src/components/ui/sidebar.tsx',
    'components/ui/table': 'src/components/ui/table.tsx',
    'components/ui/tabs': 'src/components/ui/tabs.tsx',
    'components/ui/tooltip': 'src/components/ui/tooltip.tsx',
    'components/ui/breadcrumb': 'src/components/ui/breadcrumb.tsx',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.js',
  }),
  async onSuccess() {
    try {
      const stylesDir = path.join(__dirname, 'dist/styles');
      await fs.mkdir(stylesDir, { recursive: true });

      const css = await fs.readFile(path.join(__dirname, 'src/styles/globals.css'), 'utf8');
      const plugins = [postcssImport(), postcssNesting(), tailwindcss(), autoprefixer()] as const;

      const result = await postcss(plugins).process(css, {
        from: path.join(__dirname, 'src/styles/globals.css'),
        to: path.join(__dirname, 'dist/styles/globals.css'),
        map: { inline: false },
      });

      await fs.writeFile(path.join(__dirname, 'dist/styles/globals.css'), result.css);
      if (result.map) {
        await fs.writeFile(
          path.join(__dirname, 'dist/styles/globals.css.map'),
          result.map.toString()
        );
      }
    } catch (error) {
      console.error('Error processing CSS:', error);
      throw error;
    }
  },
});
