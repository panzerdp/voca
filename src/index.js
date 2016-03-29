var voca = {};

import isString from './query/is_string';
import isAlpha from './query/is_alpha';
import isAlphaDigit from './query/is_alpha_digit';
import isDigit from './query/is_digit';
import isEmpty from './query/is_empty';

voca.isString = isString;
voca.isAlpha = isAlpha;
voca.isAlphaDigit = isAlphaDigit;
voca.isDigit = isDigit;
voca.isEmpty = isEmpty;

export default voca;