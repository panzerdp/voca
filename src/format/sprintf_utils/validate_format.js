import isNil from '../../utilities/object/is_nil';

/**
 * Validates the utils string.
 *
 * @ignore
 * @param  {number}   index         The index of the matched specifier.
 * @param  {Object[]} args          The array of arguments to replace specifiers.
 * @param  {string}   typeSpecifier The type specifier says what type the argument data should be treated as.
 * @return {undefined}
 */
export default function(index, args, typeSpecifier) {
  if (isNil(typeSpecifier)) {
    throw new Error('sprintf(): Unknown type specifier');
  }
  if (index > args.length - 1) {
    throw new Error('sprintf(): Too few arguments');
  }
  if (index < 0) {
    throw new Error('sprintf(): Argument number must be greater than zero');
  }
}