import babelConfig from './babel_config';
import banner from './banner';

export default {
  entry: 'src/index.js',
  plugins: [
    babelConfig
  ],
  targets: [{
    dest: 'dist_mod/index.js',
    format: 'umd',
    moduleName: 'v',
    sourceMap: false,
    banner: banner
  }]
};