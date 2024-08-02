import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@runtimers': '/runtimers'
    }
  },

  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from '@runtimers'`
  }
});
