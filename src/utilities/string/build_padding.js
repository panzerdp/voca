import repeat from '../../manipulate/repeat';
import toInteger from '../number/to_integer';

/**
 * Creates the padding string.
 *
 * @ignore
 * @param {string} padCharacters The characters to create padding string.
 * @param {number} length The padding string length.
 * @return {string} The padding string.
 */
export default function(padCharacters, length) {
  var padStringRepeat = toInteger(length / padCharacters.length),
    padStringRest = length % padCharacters.length;
  return repeat(padCharacters, padStringRepeat + padStringRest).substr(0, length);
}