//query
import endsWith from './query/ends_with';
import isAlpha from './query/is_alpha';
import isAlphaDigit from './query/is_alpha_digit';
import isBlank from './query/is_blank';
import isDigit from './query/is_digit';
import isEmpty from './query/is_empty';
import isLowerCase from './query/is_lower_case';
import isNumeric from './query/is_numeric';
import isString from './query/is_string';
import isUpperCase from './query/is_upper_case';
import startsWith from './query/starts_with';

//manipulate
import trim from './manipulate/trim';
import trimLeft from './manipulate/trim_left';
import trimRight from './manipulate/trim_right';

export default {
  endsWith: endsWith,
  isAlpha: isAlpha,
  isAlphaDigit: isAlphaDigit,
  isBlank: isBlank,
  isDigit: isDigit,
  isEmpty: isEmpty,
  isLowerCase: isLowerCase,
  isNumeric: isNumeric,
  isString: isString,
  isUpperCase: isUpperCase,
  startsWith: startsWith,

  trim: trim,
  trimLeft: trimLeft,
  trimRight: trimRight
};