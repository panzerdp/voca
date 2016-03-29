var voca = {};

import isString from './query/is_string';
import isAlpha from './query/is_alpha';
import isAlphaDigit from './query/is_alpha_digit';
import isEmpty from './query/is_empty';

voca.isString = isString;
voca.isAlpha = isAlpha;
voca.isAlphaDigit = isAlphaDigit;
voca.isEmpty = isEmpty;

export default voca;