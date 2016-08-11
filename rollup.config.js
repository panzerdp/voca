import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/index.js',
  plugins: [
    babel(babelrc())
  ],
  external: external,
  targets: [{
    dest: pkg['main'],
    format: 'umd',
    moduleName: 'v',
    sourceMap: false
  }, {
    dest: pkg['jsnext:main'],
    format: 'es',
    sourceMap: false
  }]
};