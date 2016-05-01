/**
 * Functions to count characters in a string
 * @namespace Count
 */
import length from './count/length';
import lengthCodePoint from './count/length_code_point';
import lengthWhere from './count/length_where';

/**
 * Functions to escape RegExp special characters
 * @namespace Escape
 */
import escapeRegExp from './escape/escape_reg_exp';

/**
 * Functions to find index
 * @namespace Index
 */
import indexOf from './index/index_of';
import lastIndexOf from './index/last_index_of';
import search from './index/search';

/**
 * Functions to manipulate a string
 * @namespace Manipulate
 */
import capitalize from './manipulate/capitalize';
import decapitalize from './manipulate/decapitalize';
import latinise from './manipulate/latinise';
import repeat from './manipulate/repeat';
import replace from './manipulate/replace';
import reverse from './manipulate/reverse';
import reverseCodePoint from './manipulate/reverse_code_point';
import slice from './manipulate/slice';
import substr from './manipulate/substr';
import substring from './manipulate/substring';
import toLowerCase from './manipulate/to_lower_case';
import toUpperCase from './manipulate/to_upper_case';
import trim from './manipulate/trim';
import trimLeft from './manipulate/trim_left';
import trimRight from './manipulate/trim_right';

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
 * Functions to split a string
 * @namespace Split
 */
import chars from './split/chars';
import charsCodePoint from './split/chars_code_point';
import split from './split/split';
import words from './split/words';

var v = {
  length: length,
  lengthCodePoint: lengthCodePoint,
  lengthWhere: lengthWhere,

  escapeRegExp: escapeRegExp,

  indexOf: indexOf,
  lastIndexOf: lastIndexOf,
  search: search,

  decapitalize: decapitalize,
  capitalize: capitalize,
  latinise: latinise,
  repeat: repeat,
  replace: replace,
  reverseCodePoint: reverseCodePoint,
  reverse: reverse,
  slice: slice,
  substr: substr,
  substring: substring,
  toLowerCase: toLowerCase,
  toUpperCase: toUpperCase,
  trim: trim,
  trimLeft: trimLeft,
  trimRight: trimRight,

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

  chars: chars,
  charsCodePoint: charsCodePoint,
  split: split,
  words: words
};

export default v;