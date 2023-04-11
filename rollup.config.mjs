import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import increase from './increase.mjs';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      minify: false,
      target: 'es2015',
    }),
    json(),
    increase(),
  ],
  treeshake: true,
};
