import babelConfig from './babel_config';

export default {
  entry: 'src/index.js',
  plugins: [
    babelConfig
  ],
  targets: [{
    dest: 'dist/voca.js',
    format: 'umd',
    moduleName: 'v',
    sourceMap: false
  }]
};