import coerceToString from 'helper/string/coerce_to_string';

/**
 * Replaces all occurrences of `search` with `replace`. <br/>
 *
 * @function replaceAll
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} search The search pattern to replace. If `search` is a string, a simple string match is evaluated.
 * All matches are replaced.
 * @param {string|Function} replace The string or function which invocation result replaces all `search` matches.
 * @return {string} Returns the replacement result.
 * @example
 * v.replaceAll('good morning', 'o', '*');
 * // => 'g**d m*rning'
 * v.replaceAll('evening', /n/g, 's');
 * // => 'evesisg'
 *
 */
export default function replaceAll(subject, search, replace) {
  debugger;
  const subjectString = coerceToString(subject);
  if (search instanceof RegExp) {
    if (search.flags.indexOf('g') === -1) {
      throw new TypeError(
        'search argument is a non-global regular expression. Add "g" to make the regular expression global.'
      );
    }
    return subjectString.replace(search, replace);
  }
  const searchString = coerceToString(search);
  const isFunctionalReplace = typeof replace === 'function';
  if (!isFunctionalReplace) {
    replace = coerceToString(replace);
  }
  const searchLength = searchString.length;
  if (searchLength === 0) {
    return replaceAll(subject, /(?:)/g, replace);
  }
  const advanceBy = searchLength > 1 ? searchLength : 1;
  const matchPositions = [];
  let position = subjectString.indexOf(searchString, 0);
  while (position !== -1) {
    matchPositions.push(position);
    position = subjectString.indexOf(searchString, position + advanceBy);
  }
  let endOfLastMatch = 0;
  let result = '';
  for (let i = 0; i < matchPositions.length; i++) {
    const position = matchPositions[i];
    let replacement = replace;
    if (isFunctionalReplace) {
      replacement = coerceToString(replace.call(undefined, searchString, position, subjectString));
    }
    result += subjectString.slice(endOfLastMatch, position) + replacement;
    endOfLastMatch = position + searchLength;
  }
  if (endOfLastMatch < subjectString.length) {
    result += subjectString.slice(endOfLastMatch);
  }
  return result;
}
