import isNil from 'helper/object/is_nil';

/**
 * Validates the specifier type and replacement position.
 *
 * @ignore
 * @throws {Error} Throws an exception on insufficient arguments or unknown specifier.
 * @param  {number} index The index of the matched specifier.
 * @param  {number} replacementsLength The number of replacements.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {undefined}
 */
export default function validate(index, replacementsLength, conversion) {
  if (isNil(conversion.typeSpecifier)) {
    throw new Error('sprintf(): Unknown type specifier');
  }
  if (index > replacementsLength - 1) {
    throw new Error('sprintf(): Too few arguments');
  }
  if (index < 0) {
    throw new Error('sprintf(): Argument number must be greater than zero');
  }
}