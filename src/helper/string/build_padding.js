import repeat from 'manipulate/repeat';
import toInteger from 'helper/number/to_integer';

/**
 * Creates the padding string.
 *
 * @ignore
 * @param {string} padCharacters The characters to create padding string.
 * @param {number} length The padding string length.
 * @return {string} The padding string.
 */
export default function buildPadding(padCharacters, length) {
  const padStringRepeat = toInteger(length / padCharacters.length);
  const padStringRest = length % padCharacters.length;
  return repeat(padCharacters, padStringRepeat + padStringRest).substr(0, length);
}