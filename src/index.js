import functions from './functions';

function Voca(value) {
  if (value instanceof Voca) {
    return value;
  }
  if (!(this instanceof Voca)) {
    // Make sure to create a new object
    return new Voca(value);
  }
  this._wrappedValue = value;
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


Object.assign(Voca, functions);

export default Voca;