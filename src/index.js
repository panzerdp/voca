//query
import isAlpha from './query/is_alpha';
import isAlphaDigit from './query/is_alpha_digit';
import isBlank from './query/is_blank';
import isDigit from './query/is_digit';
import isEmpty from './query/is_empty';
import isEndingWith from './query/is_ending_with';
import isLowerCase from './query/is_lower_case';
import isNumeric from './query/is_numeric';
import isStartingWith from './query/is_starting_with';
import isString from './query/is_string';
import isUpperCase from './query/is_upper_case';

//manipulate
import trim from './manipulate/trim';
import trimLeft from './manipulate/trim_left';
import trimRight from './manipulate/trim_right';

export default {
  isAlpha: isAlpha,
  isAlphaDigit: isAlphaDigit,
  isBlank: isBlank,
  isDigit: isDigit,
  isEmpty: isEmpty,
  isEndingWith: isEndingWith,
  isLowerCase: isLowerCase,
  isNumeric: isNumeric,
  isStartingWith: isStartingWith,
  isString: isString,
  isUpperCase: isUpperCase,

  trim: trim,
  trimLeft: trimLeft,
  trimRight: trimRight
};