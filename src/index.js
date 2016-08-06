import functions from './functions';
import ChainWrapper from './chain/wrapper';
import chain from './chain/chain'; // include chain here to resolve af circular reference

/**
 * Creates a chain object that wraps `subject`, enabling <i>implicit</i> chain sequences.<br/>
 * The functions that return `number`, `boolean` or `array` <i>terminates</i> the chain sequence and return the unwrapped value.
 * Otherwise use `v.prototype.value()` to unwrap the result.
 *
 * @memberOf Chain
 * @function v
 * @param {string} subject The string to wrap.
 * @return {Object}  Returns the new wrapper object.
 * @example
 * v('Back to School')
 *  .lowerCase()
 *  .words()
 * // => ['back', 'to', 'school']
 *
 * v(" Back to School ")
 *  .trim()
 *  .truncate(4)
 *  .value()
 * // => 'Back...'
 */
function Voca(subject) {
  return new ChainWrapper(subject, false);
}

Object.assign(Voca, functions, {
  chain: chain
});

export default Voca;