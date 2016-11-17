import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
  entry: 'src/index.js',
  plugins: [
    babel(babelrc())
  ],
  targets: [{
    dest: 'dist/voca.js',
    format: 'umd',
    moduleName: 'v',
    sourceMap: false
  }]
};