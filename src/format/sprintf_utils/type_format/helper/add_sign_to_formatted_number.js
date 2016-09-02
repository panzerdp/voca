import Const from '../../const';

/**
 * Add sign to the formatted number.
 *
 * @ignore
 * @name addSignToFormattedNumber
 * @param  {number} replacementNumber    The number to be replaced.
 * @param  {string} formattedReplacement The formatted version of number.
 * @param  {string} signSpecifier        The sign specifier.
 * @return {string}                      Returns the formatted number string with a sign.
 */
export default function(replacementNumber, formattedReplacement, signSpecifier) {
  if (signSpecifier === Const.LITERAL_PLUS && replacementNumber >= 0) {
    formattedReplacement = Const.LITERAL_PLUS + formattedReplacement;
  }
  return formattedReplacement;
}