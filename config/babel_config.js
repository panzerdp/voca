import babel from 'rollup-plugin-babel';

export default babel({
  plugins: [
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-block-scoping',
    '@babel/plugin-transform-parameters',
    '@babel/plugin-transform-shorthand-properties',
    '@babel/plugin-transform-spread',
    '@babel/plugin-transform-destructuring',
    [
      'module-resolver',
      {
        root: ['./src']
      }
    ]
  ],
  babelrc: false
});
