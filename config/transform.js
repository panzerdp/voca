const babel = require('babel-core');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const DIRECTORY_SRC = 'src/';
const DIRECTORY_DIST = 'dist_mod/';

compileFunctions();
compileHelpers();

function compileFunctions() {
  getFunctionFiles().forEach(function(file) {
    const destinationFile = DIRECTORY_DIST + path.basename(file);
    babel.transformFile(file, {
      resolveModuleSource: resolveModuleSource
    }, handleFunctionsCompilation.bind(null, destinationFile));
  });
}

function compileHelpers() {
  getHelperFiles().forEach(function(file) {
    const destinationFile = DIRECTORY_DIST + file.split(path.sep).slice(1).join(path.sep);
    mkdirp.sync(path.dirname(destinationFile));
    babel.transformFile(file, {
      resolveModuleSource: resolveHelperModuleSource
    }, handleFunctionsCompilation.bind(null, destinationFile));
  });
}

function getFunctionFiles() {
  return glob.sync(DIRECTORY_SRC + '*/*.js', {
    ignore: [
      DIRECTORY_SRC + 'chain/*.js',
      DIRECTORY_SRC + 'helper/**/*.js',
      DIRECTORY_SRC + 'util/no_conflict.js',
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
    /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
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

function resolveModuleSource(source) {
  if (source.indexOf('helper') === 0) {
    return './' + source;
  }
  return './' + path.basename(source);
}

function resolveHelperModuleSource(source, filename) {
  if (source.indexOf('helper') === 0) {
    return source;
  }
  const moduleName = path.basename(source);
  return path.relative(path.dirname(filename), DIRECTORY_SRC + moduleName);
}