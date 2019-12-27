import babel from 'rollup-plugin-babel';
import banner from '../../banner';

import { DIST_MODULE_CJS, SRC } from '../../const';

export default {
  input: `${SRC}/index.js`,
  plugins: [babel()],
  output: {
    file: `${DIST_MODULE_CJS}/index.js`,
    format: 'umd',
    name: 'v',
    sourcemap: false,
    banner: banner,
  },
};
