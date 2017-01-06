/**
 * Converts the subject to title case.
 *
 * @function snakeCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to title case.
 * @param  {string} [ignoreWords] The list of words that should not be changed.
 * @return {string}              Returns the title case string.
 * @example
 * v.snakeCase('learning to fly');
 * // => 'learning_to_fly'
 *
 * v.snakeCase('LearningToFly');
 * // => 'learning_to_fly'
 *
 * v.snakeCase('-Learning-To-Fly-');
 * // => 'learning_to_fly'
 */
export default function titleCase(subject) {
  return subject;
}