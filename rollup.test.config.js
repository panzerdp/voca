import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
  entry: 'test/index.js',
  plugins: [
    babel(babelrc())
  ],
  external: [
  ],
  targets: [{
    dest: 'test_runner/test_bundle.js',
    format: 'iife',
    sourceMap: true
  }]
};