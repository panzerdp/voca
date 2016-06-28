import isNil from '../../utils/object/is_nil';

/**
 * Validates the formatter string.
 *
 * @ignore
 * @param  {number}   matchIndex    The index of the matched specifier.
 * @param  {Object[]} args          The array of arguments to replace specifiers.
 * @param  {number}   position      The position modifier.
 * @param  {string}   typeSpecifier The type specifier says what type the argument data should be treated as.
 */
export default function(matchIndex, args, position, typeSpecifier) {
  if (isNil(typeSpecifier)) {
    throw new Error('sprintf(): Unknown type specifier');
  }
  if (matchIndex > args.length - 1) {
    throw new Error('sprintf(): Too few arguments');
  }
  if (!isNil(position)) {
    if (position > args.length) {
      throw new Error('sprintf(): Too few arguments');
    } else if (position < 1) {
      throw new Error('sprintf(): Argument number must be greater than zero');
    }
  }
}