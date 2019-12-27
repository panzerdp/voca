import babel from 'rollup-plugin-babel';
import banner from '../../banner';

import { DIST_UNIVERSAL, SRC } from '../../const';

export default {
  input: `${SRC}/index.js`,
  plugins: [babel()],
  output: {
    file: `${DIST_UNIVERSAL}/voca.js`,
    format: 'umd',
    name: 'v',
    sourcemap: false,
    banner: banner,
  },
};
