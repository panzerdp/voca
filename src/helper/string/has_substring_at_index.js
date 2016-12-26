/**
 * Checks whether `subject` contains substring at specific `index`.
 *
 * @ignore
 * @param {string} subject The subject to search in.
 * @param {string} substring The substring to search/
 * @param {number} index The index to search substring.
 * @param {boolean} lookBehind Whether to look behind (true) or ahead (false).
 * @return {boolean} Returns a boolean whether the substring exists.
 */
export default function hasSubstringAtIndex(subject, substring, index, lookBehind = true) {
  let indexOffset = 0;
  if (lookBehind) {
    indexOffset = - substring.length + 1;
  }
  const extractedSubstring = subject.substr(index + indexOffset, substring.length);
  return extractedSubstring.toLowerCase() === substring;
}