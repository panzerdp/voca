var voca = {};

import isString from './query/is_string';
import isAlpha from './query/is_alpha';
import isAlphaNumeric from './query/is_alpha_numeric';

voca.isString = isString;
voca.isAlpha = isAlpha;
voca.isAlphaNumeric = isAlphaNumeric;

export default voca;