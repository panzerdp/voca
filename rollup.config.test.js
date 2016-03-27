import babel from 'rollup-plugin-babel';

export default {
  entry: 'test/index.js',
  plugins: [babel()],
  format: 'cjs',
  intro: 'require("source-map-support").install();',
  dest: 'build/test-bundle.js',
  sourceMap: true
};
