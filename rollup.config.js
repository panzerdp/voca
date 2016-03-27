import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  sourceMap: true,
  plugins: [babel()]
};