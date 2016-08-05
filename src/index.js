import functions from './functions';
import ChainWrapper from './chain/wrapper';

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

Object.keys(functions).forEach(function(name) {
  Voca[name] = functions[name];
});

export default Voca;