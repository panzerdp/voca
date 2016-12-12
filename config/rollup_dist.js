import babelConfig from './babel_config';
import banner from './banner';

export default {
  entry: 'src/index.js',
  plugins: [
    babelConfig
  ],
  targets: [{
    dest: 'dist/voca.js',
    format: 'umd',
    moduleName: 'v',
    sourceMap: false,
    banner: banner
  }]
};