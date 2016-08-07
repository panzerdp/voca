import getGlobalObject from '../utilities/object/get_global';

var globalObject = getGlobalObject(),
  previousV = globalObject.v;

/**
 * Restores `v` variable to previous value and returns Voca library instance.
 *
 * @function noConflict
 * @static
 * @memberOf Util
 * @return {Object} Returns Voca library instance.
 * @example
 * var voca = v.noConflict();
 * voca.isAlhpa('Hello');
 * // => true
 */
export default function () {
  if (this === globalObject.v) {
    globalObject.v = previousV;
  }
  return this;
}