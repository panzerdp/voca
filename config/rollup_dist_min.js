import babelConfig from './babel_config';
import banner from './banner';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  plugins: [
    babelConfig,
    uglify({
      output: {
        comments: /^!/
      }
    })
  ],
  output: [{
    file: 'dist/voca.min.js',
    format: 'umd',
    name: 'v',
    sourcemap: true,
    banner: banner
  }]
};