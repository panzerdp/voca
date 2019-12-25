import babel from 'rollup-plugin-babel';
import glob from 'glob';

const DIRECTORY_SRC = 'src/';
const DIRECTORY_DIST = 'dist_mod/';

function modulesPaths() {
  const paths = glob.sync(DIRECTORY_SRC + '*/*.js', {
    ignore: [
      DIRECTORY_SRC + 'chain/*.js',
      DIRECTORY_SRC + 'helper/**/*.js',
      DIRECTORY_SRC + 'util/**/*.js',
      DIRECTORY_SRC + 'functions.js',
      DIRECTORY_SRC + 'index.js'
    ]
  });
  return paths;
}

export default {
  input: modulesPaths(),
  plugins: [babel()],
  output: {
    dir: DIRECTORY_DIST,
    format: 'cjs'
  }
};
