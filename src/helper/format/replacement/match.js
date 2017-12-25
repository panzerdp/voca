import coerceToNumber from 'helper/number/coerce_to_number';
import computeReplacement from 'helper/format/replacement/compute';
import ConversionSpecification from 'helper/format/conversion_specification';
import validateReplacement from 'helper/format/replacement/validate';

/**
 * Return the replacement for regular expression match of the conversion specification.
 *
 * @ignore
 * @name matchReplacement
 * @param {ReplacementIndex} replacementIndex The replacement index object.
 * @param {string[]} replacements The array of replacements.
 * @param {string} conversionSpecification The conversion specification.
 * @param {string} percent The percent characters from conversion specification.
 * @param {string} position The position to insert the replacement.
 * @param {string} signSpecifier The sign specifier to force a sign to be used on a number.
 * @param {string} paddingSpecifier The padding specifier that says what padding character will be used.
 * @param {string} alignmentSpecifier The alignment specifier that says if the result should be left-justified or right-justified.
 * @param {string} widthSpecifier The width specifier how many characters this conversion should result in.
 * @param {string} precisionSpecifier The precision specifier says how many decimal digits should be displayed for floating-point numbers.
 * @param {string} typeSpecifier The type specifier says what type the argument data should be treated as.
 * @return {string} Returns the computed replacement.
 */
export default function match(replacementIndex, replacements, conversionSpecification, percent, position, signSpecifier,
  paddingSpecifier, alignmentSpecifier, widthSpecifier, precisionSpecifier, typeSpecifier) {
  const conversion = new ConversionSpecification({
    percent,
    signSpecifier,
    paddingSpecifier,
    alignmentSpecifier,
    width: coerceToNumber(widthSpecifier, null),
    precision: coerceToNumber(precisionSpecifier, null),
    typeSpecifier
  });
  if (conversion.isPercentLiteral()) {
    return conversionSpecification.slice(1);
  }
  const actualReplacementIndex = replacementIndex.getIndexByPosition(position);
  replacementIndex.incrementOnEmptyPosition(position);
  validateReplacement(actualReplacementIndex, replacements.length, conversion);
  return computeReplacement(replacements[actualReplacementIndex], conversion);
}