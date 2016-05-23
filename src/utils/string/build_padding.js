import repeat from '../../manipulate/repeat';

/**
 * Create the padding string.
 *
 * @ignore
 * @param {string} padCharacters The characters to create padding string.
 * @param {number} length The padding string length.
 * @return {string} The padding string.
 */
export default function(padCharacters, length) {
  var padStringRepeat = ~~(length / padCharacters.length),
    padStringRest = length % padCharacters.length;
  return repeat(padCharacters, padStringRepeat + padStringRest);
}