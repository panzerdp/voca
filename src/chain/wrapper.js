import functions from '../functions';

/**
 * The chain wrapper constructor.
 *
 * @ignore
 * @param  {string} subject The string to be wrapped.
 * @param  {boolean} [explicitChain=false] A boolean that indicates if the chain sequence is explicit or implicit.
 * @return {ChainWrapper} Returns a new instance of `ChainWrapper`
 * @constructor
 */
function ChainWrapper(subject, explicitChain = true) {
  if (subject instanceof ChainWrapper) {
    return subject;
  }
  if (!(this instanceof ChainWrapper)) {
    // Make sure to create a new object
    return new ChainWrapper(subject, explicitChain);
  }
  this._wrappedValue = subject;
  this._explicitChain = explicitChain;
}

Object.keys(functions).forEach(function(name) {
  var vocaFunction = functions[name];
  ChainWrapper.prototype[name] = function(...args) {
    var result = vocaFunction(this._wrappedValue, ...args);
    if (!this._explicitChain && typeof result !== 'string') {
      return result;
    } else {
      return new ChainWrapper(result, this._explicitChain);
    }
  };
});

/**
 * Unwraps the chain sequence value.
 *
 * @memberof Chain
 * @function __proto__value
 * @return {Object} Returns the unwrapped value.
 * @example
 * v
 *  .chain('Hello world')
 *  .replace('Hello', 'Hi')
 *  .lowerCase()
 *  .slugify()
 *  .value()
 * // => 'hi-world'
 *
 * v(" Space travel ")
 *  .chain()
 *  .trim()
 *  .truncate(5)
 *  .value()
 * // => 'Space...'
 */
ChainWrapper.prototype.value = function value() {
  return this._wrappedValue;
};

/**
 * Override the default object valueOf().
 * @ignore
 * @return {*} Returns the wrapped value.
 */
ChainWrapper.prototype.valueOf = function valueOf() {
  return this.value();
};

/**
 * Returns the wrapped value to be used in JSON.stringify().
 * @ignore
 * @return {*} Returns the wrapped value.
 */
ChainWrapper.prototype.toJSON = function toJSON() {
  return this.value();
};

/**
 * Returns the string representation of the wrapped value.
 * @ignore
 * @return {string} Returns the string representation.
 */
ChainWrapper.prototype.toString = function toString() {
  return String(this.value);
};

/**
 * Creates a new chain object that enables <i>explicit</i> chain sequences.
 * Use `v.prototype.value()` to unwrap the result. <br/>
 * Does not modify the wrapped value.
 *
 * @memberof Chain
 * @function __proto__chain
 * @return {Object} Returns the new wrapper object.
 * @example
 * v('Back to School')
 *  .chain()
 *  .lowerCase()
 *  .words()
 *  .value()
 * // => ['back', 'to', 'school']
 *
 * v(" Back to School ")
 *  .chain()
 *  .trim()
 *  .truncate(4)
 *  .value()
 * // => 'Back...'
 */

ChainWrapper.prototype.chain = function() {
  return new ChainWrapper(this._wrappedValue, true);
};

/**
 * A boolean that indicates if the chain sequence is explicit or implicit.
 * @ignore
 * @type {boolean}
 * @private
 */
ChainWrapper.prototype._explicitChain = true;

export default ChainWrapper;