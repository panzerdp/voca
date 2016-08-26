import Const from './const';
import nilDefault from '../../helper/undefined/nil_default';

/**
 * Get the padding character from padding specifier.
 *
 * @ignore
 * @param  {string=} paddingSpecifier The padding specifier.
 * @return {string}                   Returns the padding character.
 */
export default function(paddingSpecifier) {
  var paddingCharacter = nilDefault(paddingSpecifier, ' ');
  if (paddingCharacter[0] === Const.LITERAL_SINGLE_QUOTE && paddingCharacter.length === 2) {
    paddingCharacter = paddingCharacter[1];
  }
  return paddingCharacter;
}