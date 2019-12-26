import isNil from 'helper/object/is_nil';

/**
 * The current index.
 *
 * @ignore
 * @name ReplacementIndex#index
 * @type {number}
 * @return {ReplacementIndex} ReplacementIndex instance.
 */
function ReplacementIndex() {
  this.index = 0;
}

/**
 * Increment the current index.
 *
 * @ignore
 * @return {undefined}
 */
ReplacementIndex.prototype.increment = function() {
  this.index++;
};

/**
 * Increment the current index by position.
 *
 * @ignore
 * @param {number} [position] The replacement position.
 * @return {undefined}
 */
ReplacementIndex.prototype.incrementOnEmptyPosition = function(position) {
  if (isNil(position)) {
    this.increment();
  }
};

/**
 * Get the replacement index by position.
 *
 * @ignore
 * @param {number} [position] The replacement position.
 * @return {number} The replacement index.
 */
ReplacementIndex.prototype.getIndexByPosition = function(position) {
  return isNil(position) ? this.index : position - 1;
};

export default ReplacementIndex;
