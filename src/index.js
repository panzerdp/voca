var voca = {};

import isAlpha from './query/is_alpha';
import isAlphaDigit from './query/is_alpha_digit';
import isDigit from './query/is_digit';
import isEmpty from './query/is_empty';
import isNumeric from './query/is_numeric';
import isString from './query/is_string';

voca.isAlpha = isAlpha;
voca.isAlphaDigit = isAlphaDigit;
voca.isDigit = isDigit;
voca.isEmpty = isEmpty;
voca.isNumeric = isNumeric;
voca.isString = isString;

export default voca;