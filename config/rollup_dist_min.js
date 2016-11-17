import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/index.js',
  plugins: [
    babel(babelrc({
      path: 'config/.rollup_babelrc'
    })),
    uglify()
  ],
  targets: [{
    dest: 'dist/voca.min.js',
    format: 'umd',
    moduleName: 'v',
    sourceMap: false
  }]
};