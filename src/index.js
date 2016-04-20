/**
 * Functions to count characters in a string
 * @namespace Count
 */
import length from './count/length';
import lengthCodePoint from './count/length_code_point';

/**
 * Functions to query a string
 * @namespace Query
 */
import endsWith from './query/ends_with';
import includes from './query/includes';
import isAlpha from './query/is_alpha';
import isAlphaDigit from './query/is_alpha_digit';
import isBlank from './query/is_blank';
import isDigit from './query/is_digit';
import isEmpty from './query/is_empty';
import isLowerCase from './query/is_lower_case';
import isNumeric from './query/is_numeric';
import isString from './query/is_string';
import isUpperCase from './query/is_upper_case';
import matches from './query/matches';
import startsWith from './query/starts_with';

/**
 * Functions to manipulate a string
 * @namespace Manipulate
 */
import repeat from './manipulate/repeat';
import reverse from './manipulate/reverse';
import reverseCodePoint from './manipulate/reverse_code_point';
import slice from './manipulate/slice';
import substr from './manipulate/substr';
import substring from './manipulate/substring';
import trim from './manipulate/trim';
import trimLeft from './manipulate/trim_left';
import trimRight from './manipulate/trim_right';

var v = {
  length: length,
  lengthCodePoint: lengthCodePoint,

  endsWith: endsWith,
  includes: includes,
  isAlpha: isAlpha,
  isAlphaDigit: isAlphaDigit,
  isBlank: isBlank,
  isDigit: isDigit,
  isEmpty: isEmpty,
  isLowerCase: isLowerCase,
  isNumeric: isNumeric,
  isString: isString,
  isUpperCase: isUpperCase,
  matches: matches,
  startsWith: startsWith,

  repeat: repeat,
  reverseCodePoint: reverseCodePoint,
  reverse: reverse,
  slice: slice,
  substr: substr,
  substring: substring,
  trim: trim,
  trimLeft: trimLeft,
  trimRight: trimRight
};

export default v;