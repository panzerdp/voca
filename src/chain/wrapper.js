import functions from '../functions';

/**
 * Chain wrapper class.
 * @ignore
 */
class ChainWrapper {
  /**
   * The chain wrapper constructor.
   *
   * @ignore
   * @param  {string}       subject               The string to be wrapped.
   * @param  {boolean}      [explicitChain=false] A boolean that indicates if the chain sequence is explicit or implicit.
   * @return {ChainWrapper}                       Returns a new instance of `ChainWrapper`
   * @constructor
   */
  constructor(subject, explicitChain) {
    this._wrappedValue = subject;
    this._explicitChain = explicitChain;
  }

  /**
   * Unwraps the chain sequence value.
   *
   * @memberof Chain
   * @since 1.0.0
   * @function __proto__value
   * @return {*} Returns the unwrapped value.
   * @example
   * v
   *  .chain('Hello world')
   *  .replace('Hello', 'Hi')
   *  .lowerCase()
   *  .slugify()
   *  .value()
   * // => 'hi-world'
   *
   * v(' Space travel ')
   *  .trim()
   *  .truncate(5)
   *  .value()
   * // => 'Space...'
   */
  value() {
    return this._wrappedValue;
  }

  /**
   * Override the default object valueOf().
   *
   * @ignore
   * @return {*} Returns the wrapped value.
   */
  valueOf() {
    return this.value();
  }

  /**
   * Returns the wrapped value to be used in JSON.stringify().
   *
   * @ignore
   * @return {*} Returns the wrapped value.
   */
  toJSON() {
    return this.value();
  }

  /**
   * Returns the string representation of the wrapped value.
   *
   * @ignore
   * @return {string} Returns the string representation.
   */
  toString() {
    return String(this.value());
  }

  /**
   * Creates a new chain object that enables <i>explicit</i> chain sequences.
   * Use `v.prototype.value()` to unwrap the result. <br/>
   * Does not modify the wrapped value.
   *
   * @memberof Chain
   * @since 1.0.0
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
  chain() {
    return new ChainWrapper(this._wrappedValue, true);
  }

  /**
   * Modifies the wrapped value with the invocation result of `changer` function.
   *
   * @memberof Chain
   * @since 1.0.0
   * @function __proto__thru
   * @param  {Function} changer The function to invoke.
   * @return {Object}           Returns the new wrapper object.
   * @example
   * v('sun is shining')
   *  .words()
   *  .thru(function(words) {
   *    return words[0];
   *  })
   *  .value()
   * // => 'sun'
   *
   */
  thru(changer) {
    if (typeof changer === 'function') {
      return new ChainWrapper(changer(this._wrappedValue), this._explicitChain);
    }
    return this;
  }
}

/**
 * A boolean that indicates if the chain sequence is explicit or implicit.
 * @ignore
 * @type {boolean}
 * @private
 */
ChainWrapper.prototype._explicitChain = true;

/**
 * Make a voca function chainable.
 *
 * @ignore
 * @param  {Function} functionInstance The function to make chainable
 * @return {Function}                  Returns the chainable function
 */
function makeFunctionChainable(functionInstance) {
  return function(...args) {
    var result = functionInstance(this._wrappedValue, ...args);
    if (this._explicitChain || typeof result === 'string') {
      return new ChainWrapper(result, this._explicitChain);
    } else {
      return result;
    }
  };
}

Object.keys(functions).forEach(function(name) {
  ChainWrapper.prototype[name] = makeFunctionChainable(functions[name]);
});


export default ChainWrapper;