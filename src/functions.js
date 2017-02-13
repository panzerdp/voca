/* eslint sort-imports: "off" */

/**
 * Functions to change the case
 * @namespace Case
 */
import camelCase from './case/camel_case';
import capitalize from './case/capitalize';
import decapitalize from './case/decapitalize';
import kebabCase from './case/kebab_case';
import lowerCase from './case/lower_case';
import snakeCase from './case/snake_case';
import upperCase from './case/upper_case';
import swapCase from './case/swap_case';
import titleCase from './case/title_case';
import truncate from './chop/truncate';

/**
 * Chain functions
 * @namespace Chain
 */

/**
 * Functions to cut a string
 * @namespace Chop
 */
import charAt from './chop/char_at';
import codePointAt from './chop/code_point_at';
import first from './chop/first';
import graphemeAt from './chop/grapheme_at';
import last from './chop/last';
import prune from './chop/prune';
import slice from './chop/slice';
import substr from './chop/substr';
import substring from './chop/substring';

/**
 * Functions to count characters in a string
 * @namespace Count
 */
import count from './count/count';
import countGraphemes from './count/count_graphemes';
import countSubstrings from './count/count_substrings';
import countWhere from './count/count_where';
import countWords from './count/count_words';

/**
 * Functions to format
 * @namespace Format
 */
import sprintf from './format/sprintf';
import vprintf from './format/vprintf';

/**
 * Functions to escape RegExp special characters
 * @namespace Escape
 */
import escapeHtml from './escape/escape_html';
import escapeRegExp from './escape/escape_reg_exp';
import unescapeHtml from './escape/unescape_html';

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
import insert from './manipulate/insert';
import latinise from './manipulate/latinise';
import pad from './manipulate/pad';
import padLeft from './manipulate/pad_left';
import padRight from './manipulate/pad_right';
import repeat from './manipulate/repeat';
import replace from './manipulate/replace';
import replaceAll from './manipulate/replace_all';
import reverse from './manipulate/reverse';
import reverseGrapheme from './manipulate/reverse_grapheme';
import slugify from './manipulate/slugify';
import splice from './manipulate/splice';
import tr from './manipulate/tr';
import trim from './manipulate/trim';
import trimLeft from './manipulate/trim_left';
import trimRight from './manipulate/trim_right';
import wordWrap from './manipulate/word_wrap';

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
import codePoints from './split/code_points';
import graphemes from './split/graphemes';
import split from './split/split';
import words from './split/words';

/**
 * Functions to strip a string
 * @namespace Strip
 */
import stripBom from './strip/strip_bom';
import stripTags from './strip/strip_tags';

/**
 * Util functions and properties
 * @namespace Util
 */
import noConflict from './util/no_conflict';
import version from './util/version';

export default {
  camelCase,
  capitalize,
  decapitalize,
  kebabCase,
  lowerCase,
  snakeCase,
  swapCase,
  titleCase,
  upperCase,

  count,
  countGraphemes,
  countSubstrings,
  countWhere,
  countWords,

  escapeHtml,
  escapeRegExp,
  unescapeHtml,

  sprintf,
  vprintf,

  indexOf,
  lastIndexOf,
  search,

  charAt,
  codePointAt,
  first,
  graphemeAt,
  last,
  prune,
  slice,
  substr,
  substring,
  truncate,

  insert,
  latinise,
  pad,
  padLeft,
  padRight,
  repeat,
  replace,
  replaceAll,
  reverse,
  reverseGrapheme,
  slugify,
  splice,
  tr,
  trim,
  trimLeft,
  trimRight,
  wordWrap,

  endsWith,
  includes,
  isAlpha,
  isAlphaDigit,
  isBlank,
  isDigit,
  isEmpty,
  isLowerCase,
  isNumeric,
  isString,
  isUpperCase,
  matches,
  startsWith,

  chars,
  codePoints,
  graphemes,
  split,
  words,

  stripBom,
  stripTags,

  noConflict,
  version
};