import babel from 'rollup-plugin-babel';

export default babel({
  "plugins": [
    "transform-object-assign",
    "transform-es2015-block-scoping",
    "transform-es2015-parameters",
    "transform-es2015-shorthand-properties",
    "transform-es2015-spread",
    ["babel-root-import", {"rootPathSuffix": "src"}]
  ],
  "babelrc": false
});