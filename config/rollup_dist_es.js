import babelConfig from './babel_config';
import banner from './banner';

export default {
  input: 'src/index.js',
  plugins: [
    babelConfig,
  ],
  output: [{
    file: 'dist_mod/index.es2015.js',
    format: 'es',
    name: 'v',
    sourcemap: false,
    banner: banner
  }]
};