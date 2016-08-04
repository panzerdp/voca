/* eslint-disable */

import functions from './functions';

/**
 * Creates a chain object that wraps `subject`, enabling explicit chain sequences. Equivalent to `v.chain(subject)`.<br/>
 * Use `v.prototype.value()` to unwrap the result.
 *
 * @memberOf Chain
 * @function v
 * @param {string} subject The string to wrap.
 * @return {Object}        Returns voca wrapper object.
 * @example
 * v('Back to School')
 *  .lowerCase()
 *  .words()
 *  .value()
 * // => ['back', 'to', 'school']
 */
function ChainWrapper(subject) {
  if (subject instanceof ChainWrapper) {
    return subject;
  }
  if (!(this instanceof ChainWrapper)) {
    // Make sure to create a new object
    return new ChainWrapper(subject);
  }
  this._wrappedValue = subject;
}

/**
 * @ignore
 * @return {*}
 */
ChainWrapper.prototype.value = function value() {
  return this._wrappedValue;
};

/**
 * @ignore
 * @return {string}
 */
ChainWrapper.prototype.valueOf = function valueOf() {
  return this.value();
};

/**
 * @ignore
 * @return {string}
 */
ChainWrapper.prototype.toJSON = function toJSON() {
  return this.value();
};

/**
 * @ignore
 * @return {string}
 */
ChainWrapper.prototype.toString = function toString() {
  return String(this.value);
};

/**
 * @ignore
 * @type {boolean}
 * @private
 */
ChainWrapper.prototype._wrappedExplicit = true;

Object.keys(functions).forEach(function(name) {
  var vocaFunction = functions[name];
  ChainWrapper[name] = vocaFunction;
  ChainWrapper.prototype[name] = function(...args) {
    return new this.constructor(vocaFunction(this._wrappedValue, ...args));
  };
});