import isNil from '../../utils/object/is_nil';

/**
 * Validates the formatter string.
 *
 * @ignore
 * @param  {number}   matchIndex    The index of the matched specifier.
 * @param  {Object[]} args          The array of arguments to replace specifiers.
 * @param  {number}   position      The position modifier.
 * @param  {string}   typeSpecifier The type specifier says what type the argument data should be treated as.
 * @return {boolean}                Return true if the format is valid, false otherwise
 */
export default function(matchIndex, args, position, typeSpecifier) {
  if (isNil(typeSpecifier)) {
    throw new Error('sprintf(): Unknown type specifier');
    return false;
  }
  if (matchIndex > args.length - 1) {
    throw new Error('sprintf(): Too few arguments');
    return false;
  }
  if (!isNil(position) || position > args.length - 1) {
    throw new Error('sprintf(): Too few arguments');
    return false;
  }
  return true;
}