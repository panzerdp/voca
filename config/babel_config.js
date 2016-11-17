import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default babel(babelrc({
  path: 'config/.babelrc'
}));