import isNil from '~/helper/object/is_nil';

/**
 * The class that creates index instances.
 * @ignore
 */
export default class ReplacementIndex {
  constructor() {
    /**
     * The current index.
     *
     * @ignore
     * @name ReplacementIndex#index
     * @type {number}
     */
    this.index = 0;
  }

  /**
   * Increment the current index.
   *
   * @ignore
   * @return {undefined}
   */
  increment() {
    this.index++;
  }

  /**
   * Increment the current index by position.
   *
   * @ignore
   * @param {number} [position] The replacement position.
   * @return {undefined}
   */
  incrementOnEmptyPosition(position) {
    if (isNil(position)) {
      this.increment();
    }
  }

  /**
   * Get the replacement index by position.
   *
   * @ignore
   * @param {number} [position] The replacement position.
   * @return {number} The replacement index.
   */
  getIndexByPosition(position) {
    return isNil(position) ? this.index : position - 1;
  }
}