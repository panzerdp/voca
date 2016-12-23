import getGlobalObject from 'helper/object/get_global';

const globalObject = getGlobalObject();
const previousV = globalObject.v;

/**
 * Restores `v` variable to previous value and returns Voca library instance.
 *
 * @function noConflict
 * @static
 * @since 1.0.0
 * @memberOf Util
 * @return {Object} Returns Voca library instance.
 * @example
 * var voca = v.noConflict();
 * voca.isAlpha('Hello');
 * // => true
 */
export default function noConflict() {
  if (this === globalObject.v) {
    globalObject.v = previousV;
  }
  return this;
}
