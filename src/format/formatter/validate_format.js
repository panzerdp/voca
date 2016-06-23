import isNil from '../../utils/object/is_nil';

/**
 * Validates the formatter string.
 *
 * @ignore
 * @param  {number}   matchIndex              The index of the matched specifier.
 * @param  {Object[]} args                    The array of arguments to replace specifiers.
 * @param  {number}   position                The position modifier.
 */
export default function(matchIndex, args, conversionSpecification, position) {
  if (matchIndex > args.length - 1) {
    throw new Error('sprintf(): Too few arguments');
  }
  if (!isNil(position) || position > args.length - 1) {
    throw new Error('sprintf(): Too few arguments');
  }
  return true;
}