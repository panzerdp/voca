/* eslint-disable */

class Voca {
  constructor(value) {
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
   * 
   * @returns {string}
   */
  value() {
    return this._wrappedValue;
  }

  /**
   * @ignore
   * @returns {string}
   */
  valueOf() {
    return this.value();
  }

  /**
   * @ignore
   * @returns {string}
   */
  toJSON() {
    return this.value();
  }

  /**
   * @ignore
   * @returns {string}
   */
  toString() {
    return '' + this.value();
  }
}

export default Voca;