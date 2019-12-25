import babel from 'rollup-plugin-babel';
import banner from '../../banner';

export default {
  input: 'src/index.js',
  plugins: [babel()],
  output: {
    file: 'dist/voca.js',
    format: 'umd',
    name: 'v',
    sourcemap: false,
    banner: banner
  }
};
