var isString = require('../isString');

module.exports = function(fun, context) {
  return function(value) {
    if (!isString(value)) {
      return false;
    }
    return fun.apply(context, value);
  }
};