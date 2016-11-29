import { REGEXP_FLAGS } from 'helper/reg_exp/const';

/**
 * Get the flags string from a regular expression object.
 *
 * @ignore
 * @param {RegExp} regExp The regular expression object.
 * @return {string} Returns the string with flags chars.
 */
export default function getRegExpFlags(regExp) {
  return regExp.toString().match(REGEXP_FLAGS)[0];
}