var voca = {};

import isString from './query/is_string';
import isAlpha from './query/is_alpha';
import isAlphaNumeric from './query/is_alpha_numeric';
import isEmpty from './query/is_empty';

voca.isString = isString;
voca.isAlpha = isAlpha;
voca.isAlphaNumeric = isAlphaNumeric;
voca.isEmpty = isEmpty;

export default voca;