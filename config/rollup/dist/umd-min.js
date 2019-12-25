import babel from 'rollup-plugin-babel';

import banner from '../../banner';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  plugins: [
    babel(),
    uglify({
      output: {
        comments: /^!/
      }
    })
  ],
  output: {
    file: 'dist/voca.min.js',
    format: 'umd',
    name: 'v',
    sourcemap: true,
    banner: banner
  }
};
