import babelConfig from './babel_config';

export default {
  entry: 'test/index.js',
  plugins: [
    babelConfig
  ],
  targets: [{
    dest: 'test_runner/test_bundle.js',
    format: 'iife',
    sourceMap: true
  }]
};