import babelConfig from './babel_config';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/index.js',
  plugins: [
    babelConfig,
    uglify()
  ],
  targets: [{
    dest: 'dist/voca.min.js',
    format: 'umd',
    moduleName: 'v',
    sourceMap: true
  }]
};