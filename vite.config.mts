import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr()],
  resolve: {
    alias: {
      '@runtimers': new URL('./src/runtimers', import.meta.url).pathname
    }
  },

  esbuild: {
    jsx: 'transform',
    jsxDev: false,
    jsxImportSource: '@runtimers',
    jsxInject: `import { h } from '@runtimers/jsx-runtime'`,
    jsxFactory: 'h'
  }
});
