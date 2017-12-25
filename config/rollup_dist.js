import babelConfig from './babel_config';
import banner from './banner';

export default {
  input: 'src/index.js',
  plugins: [
    babelConfig
  ],
  output: [{
    file: 'dist/voca.js',
    format: 'umd',
    name: 'v',
    sourcemap: false,
    banner: banner
  }]
};