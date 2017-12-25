import babelConfig from './babel_config';

export default {
  input: 'test/index.js',
  plugins: [
    babelConfig
  ],
  output: [{
    file: 'test_runner/test_bundle.js',
    format: 'iife',
    sourcemap: false
  }]
};