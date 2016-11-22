var babel = require('babel-core');
var glob = require('glob');
var fs = require('fs');
var path = require('path');

var DIRECTORY_SRC = 'src/';
var DIRECTORY_DIST = 'dist_mod/';

compileFunctions();

function compileFunctions() {
  for (var file of getFunctionFiles()) {
    var destinationFile = DIRECTORY_DIST + path.basename(file);
    babel.transformFile(file, {
      getModuleId: function(moduleName) {
        console.log(moduleName);
        return null;
      },
      resolveModuleSource: function(source, filename) {
        console.log(source, ' -> ', filename);
        return source;
      }
    }, handleFunctionsCompilation.bind(null, destinationFile));
  }
}

function getFunctionFiles() {
  return glob.sync(DIRECTORY_SRC + '*/*.js', {
    ignore: [
      DIRECTORY_SRC + 'chain/*.js',
      DIRECTORY_SRC + 'helper/**/*.js',
      DIRECTORY_SRC + 'functions.js',
      DIRECTORY_SRC + 'index.js',
    ]
  });
}

function handleFunctionsCompilation(file, error, result) {
  if (error) {
    console.error(error);
    return;
  }
  writeContentToFile(file, result.code);
}

function writeContentToFile(path, content) {
  fs.writeFile(path, content, {
    encoding: 'utf8'
  });
}