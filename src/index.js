import functions from './functions';

/**
 * Creates a voca wrapper object that wraps `subject`, enabling chain sequences. Equivalent to `v.chain(subject)`.<br/>
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
function Voca(subject) {
  if (subject instanceof Voca) {
    return subject;
  }
  if (!(this instanceof Voca)) {
    // Make sure to create a new object
    return new Voca(subject);
  }
  this._wrappedValue = subject;
}

/**
 * @ignore
 */
Voca.prototype.value = function value() {
  return this._wrappedValue;
};

/**
 * @ignore
 */
Voca.prototype.valueOf = function valueOf() {
  return this.value();
};

/**
 * @ignore
 */
Voca.prototype.toJSON = function toJSON() {
  return this.value();
};

/**
 * @ignore
 */
Voca.prototype.toString = function toString() {
  return String(this.value);
};

/**
 * Creates a voca wrapper object that wraps `subject`, enabling chain sequences. <br/>
 * Use `v.prototype.value()` to unwrap the result.
 *
 * @memberOf Chain
 * @function chain
 * @param {string} subject The string to wrap.
 * @return {Object}        Returns voca wrapper object.
 * @example
 * v
 *  .chain('Back to School')
 *  .lowerCase()
 *  .words()
 *  .value()
 * // => ['back', 'to', 'school']
 */
Voca.chain = function chain(subject) {
  return new Voca(subject);
};

Object.keys(functions).forEach(function(name) {
  var vocaFunction = functions[name];
  Voca[name] = vocaFunction;
  Voca.prototype[name] = function(...args) {
    return vocaFunction(this._wrappedValue, ...args);
  };
});

export default Voca;