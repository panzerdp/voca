var babel = require('babel-core');
var glob = require('glob');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var DIRECTORY_SRC = 'src/';
var DIRECTORY_DIST = 'dist_mod/';

compileFunctions();
compileHelpers();

function compileFunctions() {
  for (var file of getFunctionFiles()) {
    var destinationFile = DIRECTORY_DIST + path.basename(file);
    babel.transformFile(file, {
      resolveModuleSource: resolveModuleSource
    }, handleFunctionsCompilation.bind(null, destinationFile));
  }
}

function compileHelpers() {
  for (var file of getHelperFiles()) {
    var destinationFile = DIRECTORY_DIST + file.split(path.sep).slice(1).join(path.sep);
    mkdirp.sync(path.dirname(destinationFile));
    babel.transformFile(file, {
      resolveModuleSource: resolveHelperModuleSource
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

function getHelperFiles() {
  return glob.sync(DIRECTORY_SRC + '/helper/**/*.js');
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

function resolveModuleSource(source, filename) {
  if (source.indexOf('helper') === 0) {
    return './' + source;
  }
  var parts = source.split('/');
  var lastIndex = parts.length - 1;
  return './' + parts[lastIndex];
}

function resolveHelperModuleSource(source, filename) {
  if (source.indexOf('helper') === 0) {
    return source;
  }
  var parts = source.split('/');
  var lastIndex = parts.length - 1;
  return './' + parts[lastIndex];
}