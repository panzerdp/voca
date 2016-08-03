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
   * @return {string}
   */
  value() {
    return this._wrappedValue;
  }

  /**
   * @ignore
   * @return {string}
   */
  valueOf() {
    return this.value();
  }

  /**
   * @ignore
   * @return {string}
   */
  toJSON() {
    return this.value();
  }

  /**
   * @ignore
   * @return {string}
   */
  toString() {
    return '' + this.value();
  }
}

export default Voca;