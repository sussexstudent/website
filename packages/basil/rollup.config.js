import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';

export default [{
  input: './src/index.ts',
  plugins: [
    typescript(),
    babel({
      extensions: ['ts', 'tsx']
    }),
  ],
  external: ['@emotion/core', 'react'],
  output: [{
    file: `dist/index.esm.js`,
    format: 'esm',
    name: 'basil',
  },{
    file: `dist/index.mjs`,
    format: 'esm',
    name: 'basil',
  },
    {
      file: `dist/index.js`,
      format: 'cjs',
      name: 'basil',
    }]
}];
