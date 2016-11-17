import babelConfig from './babel_config';

export default {
  entry: 'src/index.js',
  plugins: [
    babelConfig
  ],
  targets: [{
    dest: 'dist_npm/index.js',
    format: 'cjs',
    moduleName: 'v',
    sourceMap: false
  }]
};