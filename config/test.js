import babel from 'rollup-plugin-babel';

export default {
  entry: 'test/index.js',
  plugins: [babel({
    presets: ['es2015-rollup'],
    babelrc: false
  })],
  format: 'cjs',
  intro: 'require("source-map-support").install();',
  dest: 'build/test-bundle.js',
  sourceMap: true
};
