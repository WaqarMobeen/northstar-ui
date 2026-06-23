import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Library build. The package ships ES + CJS bundles plus a single stylesheet
// (`northstar-ui.css`). React is treated as an external peer dependency so that
// consumers dedupe on their own copy and the bundle stays tree-shakeable.
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      include: ['src'],
      exclude: ['src/**/*.test.*', 'src/**/*.stories.*', 'src/test', 'src/examples'],
    }),
  ],
  build: {
    target: 'es2021',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'northstar-ui.[ext]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
});
