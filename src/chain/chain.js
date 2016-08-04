import ChainWrapper from './wrapper';

/**
 * Creates a chain object that wraps `subject`, enabling explicit chain sequences. <br/>
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
export default function (subject) {
  var wrapper = new ChainWrapper(subject);
  return wrapper;
}