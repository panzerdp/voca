(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.v = factory());
}(this, function () { 'use strict';

  /**
   * Checks if `value` is `null` or `undefined`
   *
   * @ignore
   * @function isNil
   * @param {*} value The object to check
   * @return {boolean} Returns `true` is `value` is `undefined` or `null`, `false` otherwise
   */
  function isNil(value) {
    return value === undefined || value === null;
  }

  /**
   * Converts the `value` to a boolean. If `value` is `undefined` or `null`, returns `defaultValue`.
   *
   * @ignore
   * @function toBoolean
   * @param {*} value The value to convert.
   * @param {boolean} [defaultValue=false] The default value.
   * @return {boolean} Returns the coercion to boolean.
   */
  function coerceToBoolean (value) {
    var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    if (isNil(value)) {
      return defaultValue;
    }
    return Boolean(value);
  }

  /**
   * Checks if `subject` is a string primitive type.
   *
   * @function isString
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} subject The value to verify.
   * @return {boolean} Returns `true` if `subject` is string primitive type or `false` otherwise.
   * @example
   * v.isString('vacation');
   * // => true
   *
   * v.isString(560);
   * // => false
   */
  function isString (subject) {
    return typeof subject === 'string';
  }

  /**
   * Get the string representation of the `value`.
   * Converts the `value` to string.
   * If `value` is `null` or `undefined`, return `defaultValue`.
   *
   * @ignore
   * @function toString
   * @param {*} value             The value to convert.
   * @param {*} [defaultValue=''] The default value to return.
   * @return {string|null}        Returns the string representation of `value`. Returns `defaultValue` if `value` is
   *                              `null` or `undefined`.
   */
  function coerceToString (value) {
    var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    if (isNil(value)) {
      return defaultValue;
    }
    if (isString(value)) {
      return value;
    }
    return String(value);
  }

  /**
   * Converts the first character of `subject` to upper case and the rest to lower case.
   *
   * @function capitalize
   * @static
   * @since 1.0.0
   * @memberOf Case
   * @param  {string}  [subject='']            The string to capitalize.
   * @param  {boolean} [restToLowerCase=false] Convert the rest of `subject` to lower case.
   * @return {string}                          Returns the capitalized string.
   * @example
   * v.capitalize('apple');
   * // => 'Apple'
   *
   * v.capitalize('mAC', false);
   * // => 'MAC'
   */
  function capitalize (subject, restToLowerCase) {
    var subjectString = coerceToString(subject),
        restToLowerCaseBoolean = coerceToBoolean(restToLowerCase);
    if (subjectString === '') {
      return '';
    }
    if (restToLowerCaseBoolean) {
      subjectString = subjectString.toLowerCase();
    }
    return subjectString.substr(0, 1).toUpperCase() + subjectString.substr(1);
  }

  /**
   * Converts the `subject` to lower case.
   *
   * @function lowerCase
   * @static
   * @since 1.0.0
   * @memberOf Case
   * @param  {string} [subject=''] The string to convert to lower case.
   * @return {string}              The lower case string.
   * @example
   * v.lowerCase('Green');
   * // => 'green'
   */
  function lowerCase (subject) {
    var subjectString = coerceToString(subject, '');
    return subjectString.toLowerCase();
  }

  /**
   * Verifies if `value` is `undefined` or `null` and returns `defaultValue`. In other case returns `value`.
   *
   * @ignore
   * @function nilDefault
   * @param {*} value The value to verify.
   * @param {*} defaultValue The default value.
   * @return {*} Returns `defaultValue` if `value` is `undefined` or `null`, otherwise `defaultValue`.
   */
  function nilDefault (value, defaultValue) {
    return value == null ? defaultValue : value;
  }

  /**
   * A regular expression string that matches upper letter (upper case + title case)
   *
   * @type {string}
   * @ignore
   */
  var upLetter = '\\u0041-\\u005a\\u00c0-\\u00d6\\u00d8-\\u00de\\u0100\\u0102\\u0104\\u0106\\u0108\\u010a\\u010c\\u010e\\u0110\\u0112\\u0114\\u0116\\u0118\\u011a\\u011c\\u011e\\u0120\\u0122\\u0124\\u0126\\u0128\\u012a\\u012c\\u012e\\u0130\\u0132\\u0134\\u0136\\u0139\\u013b\\u013d\\u013f\\u0141\\u0143\\u0145\\u0147\\u014a\\u014c\\u014e\\u0150\\u0152\\u0154\\u0156\\u0158\\u015a\\u015c\\u015e\\u0160\\u0162\\u0164\\u0166\\u0168\\u016a\\u016c\\u016e\\u0170\\u0172\\u0174\\u0176\\u0178\\u0179\\u017b\\u017d\\u0181\\u0182\\u0184\\u0186\\u0187\\u0189-\\u018b\\u018e-\\u0191\\u0193\\u0194\\u0196-\\u0198\\u019c\\u019d\\u019f\\u01a0\\u01a2\\u01a4\\u01a6\\u01a7\\u01a9\\u01ac\\u01ae\\u01af\\u01b1-\\u01b3\\u01b5\\u01b7\\u01b8\\u01bc\\u01c4\\u01c5\\u01c7\\u01c8\\u01ca\\u01cb\\u01cd\\u01cf\\u01d1\\u01d3\\u01d5\\u01d7\\u01d9\\u01db\\u01de\\u01e0\\u01e2\\u01e4\\u01e6\\u01e8\\u01ea\\u01ec\\u01ee\\u01f1\\u01f2\\u01f4\\u01f6-\\u01f8\\u01fa\\u01fc\\u01fe\\u0200\\u0202\\u0204\\u0206\\u0208\\u020a\\u020c\\u020e\\u0210\\u0212\\u0214\\u0216\\u0218\\u021a\\u021c\\u021e\\u0220\\u0222\\u0224\\u0226\\u0228\\u022a\\u022c\\u022e\\u0230\\u0232\\u023a\\u023b\\u023d\\u023e\\u0241\\u0243-\\u0246\\u0248\\u024a\\u024c\\u024e\\u0370\\u0372\\u0376\\u037f\\u0386\\u0388-\\u038a\\u038c\\u038e\\u038f\\u0391-\\u03a1\\u03a3-\\u03ab\\u03cf\\u03d2-\\u03d4\\u03d8\\u03da\\u03dc\\u03de\\u03e0\\u03e2\\u03e4\\u03e6\\u03e8\\u03ea\\u03ec\\u03ee\\u03f4\\u03f7\\u03f9\\u03fa\\u03fd-\\u042f\\u0460\\u0462\\u0464\\u0466\\u0468\\u046a\\u046c\\u046e\\u0470\\u0472\\u0474\\u0476\\u0478\\u047a\\u047c\\u047e\\u0480\\u048a\\u048c\\u048e\\u0490\\u0492\\u0494\\u0496\\u0498\\u049a\\u049c\\u049e\\u04a0\\u04a2\\u04a4\\u04a6\\u04a8\\u04aa\\u04ac\\u04ae\\u04b0\\u04b2\\u04b4\\u04b6\\u04b8\\u04ba\\u04bc\\u04be\\u04c0\\u04c1\\u04c3\\u04c5\\u04c7\\u04c9\\u04cb\\u04cd\\u04d0\\u04d2\\u04d4\\u04d6\\u04d8\\u04da\\u04dc\\u04de\\u04e0\\u04e2\\u04e4\\u04e6\\u04e8\\u04ea\\u04ec\\u04ee\\u04f0\\u04f2\\u04f4\\u04f6\\u04f8\\u04fa\\u04fc\\u04fe\\u0500\\u0502\\u0504\\u0506\\u0508\\u050a\\u050c\\u050e\\u0510\\u0512\\u0514\\u0516\\u0518\\u051a\\u051c\\u051e\\u0520\\u0522\\u0524\\u0526\\u0528\\u052a\\u052c\\u052e\\u0531-\\u0556\\u10a0-\\u10c5\\u10c7\\u10cd\\u13a0-\\u13f5\\u1e00\\u1e02\\u1e04\\u1e06\\u1e08\\u1e0a\\u1e0c\\u1e0e\\u1e10\\u1e12\\u1e14\\u1e16\\u1e18\\u1e1a\\u1e1c\\u1e1e\\u1e20\\u1e22\\u1e24\\u1e26\\u1e28\\u1e2a\\u1e2c\\u1e2e\\u1e30\\u1e32\\u1e34\\u1e36\\u1e38\\u1e3a\\u1e3c\\u1e3e\\u1e40\\u1e42\\u1e44\\u1e46\\u1e48\\u1e4a\\u1e4c\\u1e4e\\u1e50\\u1e52\\u1e54\\u1e56\\u1e58\\u1e5a\\u1e5c\\u1e5e\\u1e60\\u1e62\\u1e64\\u1e66\\u1e68\\u1e6a\\u1e6c\\u1e6e\\u1e70\\u1e72\\u1e74\\u1e76\\u1e78\\u1e7a\\u1e7c\\u1e7e\\u1e80\\u1e82\\u1e84\\u1e86\\u1e88\\u1e8a\\u1e8c\\u1e8e\\u1e90\\u1e92\\u1e94\\u1e9e\\u1ea0\\u1ea2\\u1ea4\\u1ea6\\u1ea8\\u1eaa\\u1eac\\u1eae\\u1eb0\\u1eb2\\u1eb4\\u1eb6\\u1eb8\\u1eba\\u1ebc\\u1ebe\\u1ec0\\u1ec2\\u1ec4\\u1ec6\\u1ec8\\u1eca\\u1ecc\\u1ece\\u1ed0\\u1ed2\\u1ed4\\u1ed6\\u1ed8\\u1eda\\u1edc\\u1ede\\u1ee0\\u1ee2\\u1ee4\\u1ee6\\u1ee8\\u1eea\\u1eec\\u1eee\\u1ef0\\u1ef2\\u1ef4\\u1ef6\\u1ef8\\u1efa\\u1efc\\u1efe\\u1f08-\\u1f0f\\u1f18-\\u1f1d\\u1f28-\\u1f2f\\u1f38-\\u1f3f\\u1f48-\\u1f4d\\u1f59\\u1f5b\\u1f5d\\u1f5f\\u1f68-\\u1f6f\\u1f88-\\u1f8f\\u1f98-\\u1f9f\\u1fa8-\\u1faf\\u1fb8-\\u1fbc\\u1fc8-\\u1fcc\\u1fd8-\\u1fdb\\u1fe8-\\u1fec\\u1ff8-\\u1ffc\\u2102\\u2107\\u210b-\\u210d\\u2110-\\u2112\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u2130-\\u2133\\u213e\\u213f\\u2145\\u2183\\u2c00-\\u2c2e\\u2c60\\u2c62-\\u2c64\\u2c67\\u2c69\\u2c6b\\u2c6d-\\u2c70\\u2c72\\u2c75\\u2c7e-\\u2c80\\u2c82\\u2c84\\u2c86\\u2c88\\u2c8a\\u2c8c\\u2c8e\\u2c90\\u2c92\\u2c94\\u2c96\\u2c98\\u2c9a\\u2c9c\\u2c9e\\u2ca0\\u2ca2\\u2ca4\\u2ca6\\u2ca8\\u2caa\\u2cac\\u2cae\\u2cb0\\u2cb2\\u2cb4\\u2cb6\\u2cb8\\u2cba\\u2cbc\\u2cbe\\u2cc0\\u2cc2\\u2cc4\\u2cc6\\u2cc8\\u2cca\\u2ccc\\u2cce\\u2cd0\\u2cd2\\u2cd4\\u2cd6\\u2cd8\\u2cda\\u2cdc\\u2cde\\u2ce0\\u2ce2\\u2ceb\\u2ced\\u2cf2\\ua640\\ua642\\ua644\\ua646\\ua648\\ua64a\\ua64c\\ua64e\\ua650\\ua652\\ua654\\ua656\\ua658\\ua65a\\ua65c\\ua65e\\ua660\\ua662\\ua664\\ua666\\ua668\\ua66a\\ua66c\\ua680\\ua682\\ua684\\ua686\\ua688\\ua68a\\ua68c\\ua68e\\ua690\\ua692\\ua694\\ua696\\ua698\\ua69a\\ua722\\ua724\\ua726\\ua728\\ua72a\\ua72c\\ua72e\\ua732\\ua734\\ua736\\ua738\\ua73a\\ua73c\\ua73e\\ua740\\ua742\\ua744\\ua746\\ua748\\ua74a\\ua74c\\ua74e\\ua750\\ua752\\ua754\\ua756\\ua758\\ua75a\\ua75c\\ua75e\\ua760\\ua762\\ua764\\ua766\\ua768\\ua76a\\ua76c\\ua76e\\ua779\\ua77b\\ua77d\\ua77e\\ua780\\ua782\\ua784\\ua786\\ua78b\\ua78d\\ua790\\ua792\\ua796\\ua798\\ua79a\\ua79c\\ua79e\\ua7a0\\ua7a2\\ua7a4\\ua7a6\\ua7a8\\ua7aa-\\ua7ad\\ua7b0-\\ua7b4\\ua7b6\\uff21-\\uff3a';

  /**
   * A regular expression string that matches non letter chars. A negative list is used because it includes less characters than letters list itself.
   *
   * @type {string}
   * @ignore
   */
  var nonLetter = '\\u0000-\\u0040\\u005b-\\u0060\\u007b-\\u00a9\\u00ab-\\u00b4\\u00b6-\\u00b9\\u00bb-\\u00bf\\u00d7\\u00f7\\u02c2-\\u02c5\\u02d2-\\u02df\\u02e5-\\u02eb\\u02ed\\u02ef-\\u036f\\u0375\\u0378\\u0379\\u037e\\u0380-\\u0385\\u0387\\u038b\\u038d\\u03a2\\u03f6\\u0482-\\u0489\\u0530\\u0557\\u0558\\u055a-\\u0560\\u0588-\\u05cf\\u05eb-\\u05ef\\u05f3-\\u061f\\u064b-\\u066d\\u0670\\u06d4\\u06d6-\\u06e4\\u06e7-\\u06ed\\u06f0-\\u06f9\\u06fd\\u06fe\\u0700-\\u070f\\u0711\\u0730-\\u074c\\u07a6-\\u07b0\\u07b2-\\u07c9\\u07eb-\\u07f3\\u07f6-\\u07f9\\u07fb-\\u07ff\\u0816-\\u0819\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u083f\\u0859-\\u089f\\u08b5-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0970\\u0981-\\u0984\\u098d\\u098e\\u0991\\u0992\\u09a9\\u09b1\\u09b3-\\u09b5\\u09ba-\\u09bc\\u09be-\\u09cd\\u09cf-\\u09db\\u09de\\u09e2-\\u09ef\\u09f2-\\u0a04\\u0a0b-\\u0a0e\\u0a11\\u0a12\\u0a29\\u0a31\\u0a34\\u0a37\\u0a3a-\\u0a58\\u0a5d\\u0a5f-\\u0a71\\u0a75-\\u0a84\\u0a8e\\u0a92\\u0aa9\\u0ab1\\u0ab4\\u0aba-\\u0abc\\u0abe-\\u0acf\\u0ad1-\\u0adf\\u0ae2-\\u0af8\\u0afa-\\u0b04\\u0b0d\\u0b0e\\u0b11\\u0b12\\u0b29\\u0b31\\u0b34\\u0b3a-\\u0b3c\\u0b3e-\\u0b5b\\u0b5e\\u0b62-\\u0b70\\u0b72-\\u0b82\\u0b84\\u0b8b-\\u0b8d\\u0b91\\u0b96-\\u0b98\\u0b9b\\u0b9d\\u0ba0-\\u0ba2\\u0ba5-\\u0ba7\\u0bab-\\u0bad\\u0bba-\\u0bcf\\u0bd1-\\u0c04\\u0c0d\\u0c11\\u0c29\\u0c3a-\\u0c3c\\u0c3e-\\u0c57\\u0c5b-\\u0c5f\\u0c62-\\u0c84\\u0c8d\\u0c91\\u0ca9\\u0cb4\\u0cba-\\u0cbc\\u0cbe-\\u0cdd\\u0cdf\\u0ce2-\\u0cf0\\u0cf3-\\u0d04\\u0d0d\\u0d11\\u0d3b\\u0d3c\\u0d3e-\\u0d4d\\u0d4f-\\u0d5e\\u0d62-\\u0d79\\u0d80-\\u0d84\\u0d97-\\u0d99\\u0db2\\u0dbc\\u0dbe\\u0dbf\\u0dc7-\\u0e00\\u0e31\\u0e34-\\u0e3f\\u0e47-\\u0e80\\u0e83\\u0e85\\u0e86\\u0e89\\u0e8b\\u0e8c\\u0e8e-\\u0e93\\u0e98\\u0ea0\\u0ea4\\u0ea6\\u0ea8\\u0ea9\\u0eac\\u0eb1\\u0eb4-\\u0ebc\\u0ebe\\u0ebf\\u0ec5\\u0ec7-\\u0edb\\u0ee0-\\u0eff\\u0f01-\\u0f3f\\u0f48\\u0f6d-\\u0f87\\u0f8d-\\u0fff\\u102b-\\u103e\\u1040-\\u104f\\u1056-\\u1059\\u105e-\\u1060\\u1062-\\u1064\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109f\\u10c6\\u10c8-\\u10cc\\u10ce\\u10cf\\u10fb\\u1249\\u124e\\u124f\\u1257\\u1259\\u125e\\u125f\\u1289\\u128e\\u128f\\u12b1\\u12b6\\u12b7\\u12bf\\u12c1\\u12c6\\u12c7\\u12d7\\u1311\\u1316\\u1317\\u135b-\\u137f\\u1390-\\u139f\\u13f6\\u13f7\\u13fe-\\u1400\\u166d\\u166e\\u1680\\u169b-\\u169f\\u16eb-\\u16f0\\u16f9-\\u16ff\\u170d\\u1712-\\u171f\\u1732-\\u173f\\u1752-\\u175f\\u176d\\u1771-\\u177f\\u17b4-\\u17d6\\u17d8-\\u17db\\u17dd-\\u181f\\u1878-\\u187f\\u18a9\\u18ab-\\u18af\\u18f6-\\u18ff\\u191f-\\u194f\\u196e\\u196f\\u1975-\\u197f\\u19ac-\\u19af\\u19ca-\\u19ff\\u1a17-\\u1a1f\\u1a55-\\u1aa6\\u1aa8-\\u1b04\\u1b34-\\u1b44\\u1b4c-\\u1b82\\u1ba1-\\u1bad\\u1bb0-\\u1bb9\\u1be6-\\u1bff\\u1c24-\\u1c4c\\u1c50-\\u1c59\\u1c7e-\\u1ce8\\u1ced\\u1cf2-\\u1cf4\\u1cf7-\\u1cff\\u1dc0-\\u1dff\\u1f16\\u1f17\\u1f1e\\u1f1f\\u1f46\\u1f47\\u1f4e\\u1f4f\\u1f58\\u1f5a\\u1f5c\\u1f5e\\u1f7e\\u1f7f\\u1fb5\\u1fbd\\u1fbf-\\u1fc1\\u1fc5\\u1fcd-\\u1fcf\\u1fd4\\u1fd5\\u1fdc-\\u1fdf\\u1fed-\\u1ff1\\u1ff5\\u1ffd-\\u2070\\u2072-\\u207e\\u2080-\\u208f\\u209d-\\u2101\\u2103-\\u2106\\u2108\\u2109\\u2114\\u2116-\\u2118\\u211e-\\u2123\\u2125\\u2127\\u2129\\u212e\\u213a\\u213b\\u2140-\\u2144\\u214a-\\u214d\\u214f-\\u2182\\u2185-\\u2bff\\u2c2f\\u2c5f\\u2ce5-\\u2cea\\u2cef-\\u2cf1\\u2cf4-\\u2cff\\u2d26\\u2d28-\\u2d2c\\u2d2e\\u2d2f\\u2d68-\\u2d6e\\u2d70-\\u2d7f\\u2d97-\\u2d9f\\u2da7\\u2daf\\u2db7\\u2dbf\\u2dc7\\u2dcf\\u2dd7\\u2ddf-\\u2e2e\\u2e30-\\u3004\\u3007-\\u3030\\u3036-\\u303a\\u303d-\\u3040\\u3097-\\u309c\\u30a0\\u30fb\\u3100-\\u3104\\u312e-\\u3130\\u318f-\\u319f\\u31bb-\\u31ef\\u3200-\\u33ff\\u4db6-\\u4dff\\u9fd6-\\u9fff\\ua48d-\\ua4cf\\ua4fe\\ua4ff\\ua60d-\\ua60f\\ua620-\\ua629\\ua62c-\\ua63f\\ua66f-\\ua67e\\ua69e\\ua69f\\ua6e6-\\ua716\\ua720\\ua721\\ua789\\ua78a\\ua7ae\\ua7af\\ua7b8-\\ua7f6\\ua802\\ua806\\ua80b\\ua823-\\ua83f\\ua874-\\ua881\\ua8b4-\\ua8f1\\ua8f8-\\ua8fa\\ua8fc\\ua8fe-\\ua909\\ua926-\\ua92f\\ua947-\\ua95f\\ua97d-\\ua983\\ua9b3-\\ua9ce\\ua9d0-\\ua9df\\ua9e5\\ua9f0-\\ua9f9\\ua9ff\\uaa29-\\uaa3f\\uaa43\\uaa4c-\\uaa5f\\uaa77-\\uaa79\\uaa7b-\\uaa7d\\uaab0\\uaab2-\\uaab4\\uaab7\\uaab8\\uaabe\\uaabf\\uaac1\\uaac3-\\uaada\\uaade\\uaadf\\uaaeb-\\uaaf1\\uaaf5-\\uab00\\uab07\\uab08\\uab0f\\uab10\\uab17-\\uab1f\\uab27\\uab2f\\uab5b\\uab66-\\uab6f\\uabe3-\\uabff\\ud7a4-\\ud7af\\ud7c7-\\ud7ca\\ud7fc-\\uf8ff\\ufa6e\\ufa6f\\ufada-\\ufaff\\ufb07-\\ufb12\\ufb18-\\ufb1c\\ufb1e\\ufb29\\ufb37\\ufb3d\\ufb3f\\ufb42\\ufb45\\ufbb2-\\ufbd2\\ufd3e-\\ufd4f\\ufd90\\ufd91\\ufdc8-\\ufdef\\ufdfc-\\ufe6f\\ufe75\\ufefd-\\uff20\\uff3b-\\uff40\\uff5b-\\uff65\\uffbf-\\uffc1\\uffc8\\uffc9\\uffd0\\uffd1\\uffd8\\uffd9\\uffdd-\\uffff';

  /**
   * A regular expression string matching digits
   *
   * @type {string}
   * @ignore
   */
  var digit = '\\d';

  /**
   * A regular expression string matching whitespace
   *
   * @type {string}
   * @ignore
   */
  var whitespace = '\\s\\uFEFF\\xA0';

  /**
   * A regular expression string matching high surrogate
   *
   * @type {string}
   * @ignore
   */
  var highSurrogate = '\\uD800-\\uDBFF';

  /**
   * A regular expression string matching low surrogate
   *
   * @type {string}
   * @ignore
   */
  var lowSurrogate = '\\uDC00-\\uDFFF';

  /**
   * A regular expression string matching diacritical mark
   *
   * @type {string}
   * @ignore
   */
  var diacriticalMark = '\\u0300-\\u036F\\u1AB0-\\u1AFF\\u1DC0-\\u1DFF\\u20D0-\\u20FF\\uFE20-\\uFE2F';

  /**
   * Regular expression to match combining marks
   *
   * @see http://unicode.org/faq/char_combmark.html
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_COMBINING_MARKS = new RegExp('([\\0-\\u02FF\\u0370-\\u1AAF\\u1B00-\\u1DBF\\u1E00-\\u20CF\\u2100-\\uD7FF\\uE000-\\uFE1F\\uFE30-\\uFFFF]|[' + highSurrogate + '][' + lowSurrogate + ']|[' + highSurrogate + '](?![' + lowSurrogate + '])|(?:[^' + highSurrogate + ']|^)[' + lowSurrogate + '])([' + diacriticalMark + ']+)', 'g');

  /**
   * Regular expression to match surrogate pairs
   *
   * @see http://www.unicode.org/faq/utf_bom.html#utf16-2
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_SURROGATE_PAIRS = new RegExp('([' + highSurrogate + '])([' + lowSurrogate + '])', 'g');

  /**
   * Regular expression to match an unicode character
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_UNICODE_CHARACTER = new RegExp('((?:[\\0-\\u02FF\\u0370-\\u1AAF\\u1B00-\\u1DBF\\u1E00-\\u20CF\\u2100-\\uD7FF\\uE000-\\uFE1F\\uFE30-\\uFFFF]|[' + highSurrogate + '][' + lowSurrogate + ']|[' + highSurrogate + '](?![' + lowSurrogate + '])|(?:[^' + highSurrogate + ']|^)[' + lowSurrogate + '])(?:[' + diacriticalMark + ']+))|\
([' + highSurrogate + '][' + lowSurrogate + '])|([\\n\\r\\u2028\\u2029])|(.)', 'g');

  /**
   * Regular expression to match whitespaces from the left side
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEX_TRIM_LEFT = new RegExp('^[' + whitespace + ']+');

  /**
   * Regular expression to match whitespaces from the right side
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEX_TRIM_RIGHT = new RegExp('[' + whitespace + ']+$');

  /**
   * Regular expression to match alpha characters
   *
   * @see http://stackoverflow.com/a/22075070/1894471
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_ALPHA = new RegExp('^(?:[^' + nonLetter + '][' + diacriticalMark + ']*)+$');

  /**
   * Regular expression to match alpha and digit characters
   *
   * @see http://stackoverflow.com/a/22075070/1894471
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_ALPHA_DIGIT = new RegExp('^((?:[^' + nonLetter + '][' + diacriticalMark + ']*)|[' + digit + '])+$');

  /**
   * Regular expression to match digit characters
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_DIGIT = new RegExp('^' + digit + '+$');

  /**
   * Regular expression to match non basic latin characters
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_NON_BASIC_LATIN = /[^\u0000-\u007E]/g;

  /**
   * Regular expression to match regular expression special characters
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_SPECIAL_CHARACTERS = /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g;

  /**
   * A regular expression string that matches a class of lower case letters.
   *
   * @type {string}
   * @ignore
   */
  var lowerCaseLetterClass = '(?![' + upLetter + '])[^' + nonLetter + ']';

  /**
   * Regular expression to match words
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_WORD = new RegExp('(?:(?:[' + upLetter + '][' + diacriticalMark + ']*)?(?:' + lowerCaseLetterClass + '[' + diacriticalMark + ']*)+)|\
(?:(?:[' + upLetter + '][' + diacriticalMark + ']*)+(?!' + lowerCaseLetterClass + '))|\
(?:[' + digit + ']+)', 'g');

  /**
   * Regular expression to match not latin characters
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_NON_LATIN = /[\W]/g;

  /**
   * Regular expression to match HTML special characters.
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_HTML_SPECIAL_CHARACTERS = /[<>&"'`]/g;

  /**
   * Regular expression to match sprintf format string
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_CONVERSION_SPECIFICATION = /(%{1,2})(?:(\d+)\$)?(\+)?([ 0]|'.{1})?(-)?(\d+)?(?:\.(\d+))?([bcdiouxXeEfgGs])?/g;

  /**
   * Regular expression to match trailing zeros in a number
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_TRAILING_ZEROS = /\.?0+$/g;

  /**
   * Regular expression to match flags from a regular expression.
   *
   * @type {RegExp}
   * @ignore
   */
  var REGEXP_FLAGS = /[gimuy]*$/;

  /**
   * Get the string representation of the `value`.
   * Converts the `value` to string.
   *
   * @ignore
   * @function toString
   * @param {*} value             The value to convert.
   * @return {string|null}        Returns the string representation of `value`.
   */
  function toString (value) {
    if (isNil(value)) {
      return null;
    }
    if (isString(value)) {
      return value;
    }
    return String(value);
  }

  /**
   * Splits `subject` into an array of words.
   *
   * @function words
   * @static
   * @since 1.0.0
   * @memberOf Split
   * @param {string} [subject=''] The string to split into words.
   * @param {string|RegExp} [pattern] The pattern to watch words. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
   * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
   * @return {Array} Returns the array of words.
   * @example
   * v.words('gravity can cross dimensions');
   * // => ['gravity', 'can', 'cross', 'dimensions']
   *
   * v.words('gravity', /\w{1,2}/g);
   * // => ['gr', 'av', 'it', 'y']
   */
  function words (subject, pattern, flags) {
    var subjectString = coerceToString(subject),
        patternRegExp;
    if (isNil(pattern)) {
      patternRegExp = REGEXP_WORD;
    } else if (pattern instanceof RegExp) {
      patternRegExp = pattern;
    } else {
      var flagsString = toString(nilDefault(flags, ''));
      patternRegExp = new RegExp(toString(pattern), flagsString);
    }
    return nilDefault(subjectString.match(patternRegExp), []);
  }

  /**
   * Transforms the `word` into camel case chunk.
   *
   * @param  {string} word  The word string
   * @param  {number} index The index of the word in phrase.
   * @return {string}       The transformed word.
   * @ignore
   */
  function wordToCamel(word, index) {
    return index === 0 ? lowerCase(word) : capitalize(word, true);
  }

  /**
   * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/CamelCase">camel case</a>.
   *
   * @function camelCase
   * @static
   * @since 1.0.0
   * @memberOf Case
   * @param  {string} [subject=''] The string to convert to camel case.
   * @return {string}              The camel case string.
   * @example
   * v.camelCase('bird flight');
   * // => 'birdFlight'
   *
   * v.camelCase('BirdFlight');
   * // => 'birdFlight'
   *
   * v.camelCase('-BIRD-FLIGHT-');
   * // => 'birdFlight'
   */
  function camelCase (subject) {
    var subjectString = coerceToString(subject);
    if (subjectString === '') {
      return '';
    }
    return words(subjectString).map(wordToCamel).join('');
  }

  /**
   * Converts the first character of `subject` to lower case.
   *
   * @function decapitalize
   * @static
   * @since 1.0.0
   * @memberOf Case
   * @param  {string} [subject=''] The string to decapitalize.
   * @return {string}              Returns the decapitalized string.
   * @example
   * v.decapitalize('Sun');
   * // => 'sun'
   */
  function decapitalize (subject) {
    var subjectString = coerceToString(subject);
    if (subjectString === '') {
      return subjectString;
    }
    return subjectString.substr(0, 1).toLowerCase() + subjectString.substr(1);
  }

  /**
   * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/Letter_case#cite_ref-13">kebab case</a>.
   * Also called <i>spinal case</i> or <i>lisp case</i>.
   *
   * @function kebabCase
   * @static
   * @since 1.0.0
   * @memberOf Case
   * @param  {string} [subject=''] The string to convert to kebab case.
   * @return {string}              The kebab case string.
   * @example
   * v.kebabCase('goodbye blue sky');
   * // => 'goodbye-blue-sky'
   *
   * v.kebabCase('GoodbyeBlueSky');
   * // => 'goodbye-blue-sky'
   *
   * v.kebabCase('-Goodbye-Blue-Sky-');
   * // => 'goodbye-blue-sky'
   */
  function kebabCase (subject) {
    var subjectString = coerceToString(subject);
    if (subjectString === '') {
      return '';
    }
    return words(subjectString).map(lowerCase).join('-');
  }

  /**
   * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/Snake_case">snake case</a>.
   *
   * @function snakeCase
   * @static
   * @since 1.0.0
   * @memberOf Case
   * @param  {string} [subject=''] The string to convert to snake case.
   * @return {string}              Returns the snake case string.
   * @example
   * v.snakeCase('learning to fly');
   * // => 'learning_to_fly'
   *
   * v.snakeCase('LearningToFly');
   * // => 'learning_to_fly'
   *
   * v.snakeCase('-Learning-To-Fly-');
   * // => 'learning_to_fly'
   */
  function snakeCase (subject) {
    var subjectString = coerceToString(subject);
    if (subjectString === '') {
      return '';
    }
    return words(subjectString).map(lowerCase).join('_');
  }

  /**
   * Converts the `subject` to upper case.
   *
   * @function upperCase
   * @static
   * @since 1.0.0
   * @memberOf Case
   * @param  {string} [subject=''] The string to convert to upper case.
   * @return {string}              Returns the upper case string.
   * @example
   * v.upperCase('school');
   * // => 'SCHOOL'
   */
  function upperCase (subject) {
    var subjectString = coerceToString(subject);
    return subjectString.toUpperCase();
  }

  /**
   * Clip the number to interval `downLimit` to `upLimit`.
   *
   * @ignore
   * @function clipNumber
   * @param {number} value The number to clip
   * @param {number} downLimit The down limit
   * @param {number} upLimit The upper limit
   * @return {number} The clipped number
   */
  function clipNumber (value, downLimit, upLimit) {
    if (value <= downLimit) {
      return downLimit;
    }
    if (value >= upLimit) {
      return upLimit;
    }
    return value;
  }

  /**
   * Max save integer value
   *
   * @ignore
   * @type {number}
   */
  var MAX_SAFE_INTEGER = 0x1fffffffffffff;

  /**
   * Transforms `value` to an integer.
   *
   * @ignore
   * @function toInteger
   * @param {number} value The number to transform.
   * @returns {number} Returns the transformed integer.
   */
  function toInteger (value) {
    if (value === Infinity) {
      return MAX_SAFE_INTEGER;
    }
    if (value === -Infinity) {
      return -MAX_SAFE_INTEGER;
    }
    return ~~value;
  }

  /**
   * Truncates `subject` to a new `length`.
   *
   * @function truncate
   * @static
   * @since 1.0.0
   * @memberOf Cut
   * @param  {string} [subject=''] The string to truncate.
   * @param  {int}    length       The length to truncate the string.
   * @param  {string} [end='...']  The string to be added at the end.
   * @return {string}              Returns the truncated string.
   * @example
   * v.truncate('Once upon a time', 9);
   * // => 'Once u...'
   *
   * v.truncate('Good day, Little Red Riding Hood', 20, ' (read more)');
   * // => 'Good day (read more)'
   *
   * v.truncate('Once upon', 10);
   * // => 'Once upon'
   */
  function truncate (subject, length, end) {
    var subjectString = coerceToString(subject),
        lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
        endString = coerceToString(end, '...');
    if (lengthInt >= subjectString.length) {
      return subjectString;
    }
    return subjectString.substr(0, length - endString.length) + endString;
  }

  /**
   * Get a character from `subject` at specific index.
   *
   * @function charAt
   * @static
   * @since 1.0.0
   * @memberOf Cut
   * @param  {string} [subject=''] The string to extract from.
   * @param  {numbers} index The index to get the character.
   * @return {string} Returns characters.
   * @example
   * v.charAt('helicopter');
   * // => 'h'
   *
   * v.first('vehicle', 2);
   * // => 've'
   *
   * v.first('car', 5);
   * // => 'car'
   */
  function charAt (subject, index) {
    var subjectString = coerceToString(subject);
    return subjectString.charAt(index);
  }

  var HIGH_SURROGATE_START = 0xD800;
  var HIGH_SURROGATE_END = 0xDBFF;
  var LOW_SURROGATE_START = 0xDC00;
  var LOW_SURROGATE_END = 0xDFFF;

  /**
   * Checks if `codePoint` is a high-surrogate number from range 0xD800 to 0xDBFF.
   *
   * @ignore
   * @param {number} codePoint The code point number to be verified
   * @return {boolean} Returns a boolean whether `codePoint` is a high-surrogate number.
   */
  function isHighSurrogate(codePoint) {
    return codePoint >= HIGH_SURROGATE_START && codePoint <= HIGH_SURROGATE_END;
  }

  /**
   * Checks if `codePoint` is a low-surrogate number from range 0xDC00 to 0xDFFF.
   *
   * @ignore
   * @param {number} codePoint The code point number to be verified
   * @return {boolean} Returns a boolean whether `codePoint` is a low-surrogate number.
   */
  function isLowSurrogate(codePoint) {
    return codePoint >= LOW_SURROGATE_START && codePoint <= LOW_SURROGATE_END;
  }

  /**
   * Get the astral code point number based on surrogate pair numbers.
   *
   * @ignore
   * @param {number} highSurrogate The high-surrogate code point number.
   * @param {number} lowSurrogate The low-surrogate code point number.
   * @return {number} Returns the astral symbol number.
   */
  function getAstralNumberFromSurrogatePair(highSurrogate, lowSurrogate) {
    return (highSurrogate - HIGH_SURROGATE_START) * 0x400 + lowSurrogate - LOW_SURROGATE_START + 0x10000;
  }

  /**
   * Get the number representation of the `value`.
   * Converts the `value` to number.
   * If `value` is `null` or `undefined`, return `defaultValue`.
   *
   * @ignore
   * @function toString
   * @param {*} value             The value to convert.
   * @param {*} [defaultValue=''] The default value to return.
   * @return {number|null}        Returns the number representation of `value`. Returns `defaultValue` if `value` is
   *                              `null` or `undefined`.
   */
  function coerceToNumber (value) {
    var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    if (isNil(value)) {
      return defaultValue;
    }
    if (typeof value === 'number') {
      return value;
    }
    return Number(value);
  }

  /**
   * If `value` is `NaN`, return `defaultValue`. In other case returns `value`.
   *
   * @ignore
   * @function nanDefault
   * @param {*} value The value to verify.
   * @param {*} defaultValue The default value.
   * @return {*} Returns `defaultValue` if `value` is `NaN`, otherwise `defaultValue`.
   */
  function nanDefault (value, defaultValue) {
    return value !== value ? defaultValue : value;
  }

  /**
   * Get the Unicode code point value at `position`.
   *
   * @function codePointAt
   * @static
   * @since 1.0.0
   * @memberOf Cut
   * @param  {string} [subject=''] The string to extract from.
   * @param  {number} position The position to get the code point number.
   * @return {number} Returns the Unicode code point value number.
   * @example
   * v.codePointAt('rain', 1);
   * // => 'h'
   *
   * v.first('vehicle', 2);
   * // => 've'
   *
   * v.first('car', 5);
   * // => 'car'
   */
  function codePointAt (subject, position) {
    var subjectString = coerceToString(subject),
        subjectStringLength = subjectString.length,
        positionNumber = coerceToNumber(position, -1);
    positionNumber = nanDefault(positionNumber, 0);
    if (positionNumber < 0 || positionNumber >= subjectStringLength) {
      return undefined;
    }
    var firstCodePoint = subjectString.charCodeAt(positionNumber),
        secondCodePoint;
    if (isHighSurrogate(firstCodePoint) && subjectStringLength > positionNumber + 1) {
      secondCodePoint = subjectString.charCodeAt(positionNumber + 1);
      if (isLowSurrogate(secondCodePoint)) {
        return getAstralNumberFromSurrogatePair(firstCodePoint, secondCodePoint);
      }
    }
    return firstCodePoint;
  }

  /**
   * Extracts the first `length` characters from `subject`.
   *
   * @function first
   * @static
   * @since 1.0.0
   * @memberOf Cut
   * @param  {string} [subject=''] The string to extract from.
   * @param  {int}    [length=1]   The number of characters to extract.
   * @return {string}              Returns the first characters string.
   * @example
   * v.first('helicopter');
   * // => 'h'
   *
   * v.first('vehicle', 2);
   * // => 've'
   *
   * v.first('car', 5);
   * // => 'car'
   */
  function first (subject, length) {
    var subjectString = coerceToString(subject),
        lengthInt = isNil(length) ? 1 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
    if (subjectString.length <= lengthInt) {
      return subjectString;
    }
    return subjectString.substr(0, lengthInt);
  }

  /**
   * Get a grapheme from `subject` at specific index taking care of
   * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
   * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
   *
   * @function graphemeAt
   * @static
   * @since 1.0.0
   * @memberOf Cut
   * @param  {string} [subject=''] The string to extract from.
   * @param  {number} index The index to get the character.
   * @return {string} Returns a grapheme.
   * @example
   * v.graphemeAt('\uD835\uDC00\uD835\uDC01', 0); // or '𝐀𝐁'
   * // => 'A'
   *
   * v.graphemeAt('cafe\u0301', 3); // or 'café'
   * // => 'é'
   */
  function graphemeAt (subject, index) {
    if (isNil(index)) {
      return '';
    }
    var subjectString = coerceToString(subject),
        indexNumber = coerceToNumber(index),
        graphemeMatch,
        graphemeMatchIndex = 0;
    indexNumber = nanDefault(indexNumber, 0);
    while ((graphemeMatch = REGEXP_UNICODE_CHARACTER.exec(subjectString)) !== null) {
      if (graphemeMatchIndex === indexNumber) {
        REGEXP_UNICODE_CHARACTER.lastIndex = 0;
        return graphemeMatch[0];
      }
      graphemeMatchIndex++;
    }
    return '';
  }

  /**
   * Extracts the last `length` characters from `subject`.
   *
   * @function last
   * @static
   * @since 1.0.0
   * @memberOf Cut
   * @param  {string} [subject=''] The string to extract from.
   * @param  {int}    [length=1]   The number of characters to extract.
   * @return {string}              Returns the last characters string.
   * @example
   * v.last('helicopter');
   * // => 'r'
   *
   * v.last('vehicle', 2);
   * // => 'le'
   *
   * v.last('car', 5);
   * // => 'car'
   */
  function last (subject, length) {
    var subjectString = coerceToString(subject),
        lengthInt = isNil(length) ? 1 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
    if (subjectString.length <= lengthInt) {
      return subjectString;
    }
    return subjectString.substr(subjectString.length - lengthInt, lengthInt);
  }

  /**
   * Truncates `subject` to a new `length` and does not break the words. Guarantees that the truncated string will be no longer than `length`.
   *
   * @static
   * @function prune
   * @since 1.0.0
   * @memberOf Cut
   * @param  {string} [subject=''] The string to prune.
   * @param  {int}    length       The length to prune the string.
   * @param  {string} [end='...']  The string to be added at the end.
   * @return {string}              Returns the pruned string.
   * @example
   * v.prune('Once upon a time', 7);
   * // => 'Once...'
   *
   * v.prune('Good day, Little Red Riding Hood', 16, ' (more)');
   * // => 'Good day (more)'
   *
   * v.prune('Once upon', 10);
   * // => 'Once upon'
   */
  function prune (subject, length, end) {
    var subjectString = coerceToString(subject),
        lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
        endString = coerceToString(end, '...');
    if (lengthInt >= subjectString.length) {
      return subjectString;
    }
    var truncatedString = '';
    subjectString.replace(REGEXP_WORD, function (word, offset) {
      var wordInsertLength = offset + word.length;
      if (wordInsertLength <= lengthInt - endString.length) {
        truncatedString = subjectString.substr(0, wordInsertLength);
      }
    });
    return truncatedString + endString;
  }

  /**
   * Extracts from `subject` a string from `start` position to `end` position.
   *
   * @function slice
   * @static
   * @since 1.0.0
   * @memberOf Cut
   * @param  {string} [subject='']         The string to extract from.
   * @param  {number} start                The position to start extraction. If negative use `subject.length + start`.
   * @param  {number} [end=subject.length] The position to end extraction. If negative use `subject.length + end`.
   * @return {string}                      Returns the extracted string.
   * @note Uses native `String.prototype.slice()`
   * @example
   * v.slice('miami', 1);
   * // => 'iami'
   *
   * v.slice('florida', -4);
   * // => 'rida'
   */
  function slice (subject, start, end) {
    return coerceToString(subject).slice(start, end);
  }

  /**
   * Extracts from `subject` a string from `start` position a number of `length` characters.
   *
   * @function substr
   * @static
   * @since 1.0.0
   * @memberOf Cut
   * @param  {string} [subject='']                 The string to extract from.
   * @param  {number} start                        The position to start extraction.
   * @param  {number} [length=subject.endOfString] The number of characters to extract. If omitted, extract to the end of `subject`.
   * @return {string}                              Returns the extracted string.
   * @note Uses native `String.prototype.substr()`
   * @example
   * v.substr('infinite loop', 9);
   * // => 'loop'
   *
   * v.substr('dreams', 2, 2);
   * // => 'ea'
   */
  function substr (subject, start, length) {
    return coerceToString(subject).substr(start, length);
  }

  /**
   * Extracts from `subject` a string from `start` position to `end` position.
   *
   * @function substring
   * @static
   * @since 1.0.0
   * @memberOf Cut
   * @param  {string} [subject='']         The string to extract from.
   * @param  {number} start                The position to start extraction.
   * @param  {number} [end=subject.length] The position to end extraction.
   * @return {string}                      Returns the extracted string.
   * @note Uses native `String.prototype.substring()`
   * @example
   * v.substring('beach', 1);
   * // => 'each'
   *
   * v.substring('ocean', 1, 3);
   * // => 'ea'
   */
  function substring (subject, start, end) {
    return coerceToString(subject).substring(start, end);
  }

  /**
   * Counts the characters in `subject`.<br/>
   *
   * @function count
   * @static
   * @since 1.0.0
   * @memberOf Count
   * @param  {string} [subject=''] The string to count characters.
   * @return {number}              Returns the number of characters in `subject`.
   * @example
   * v.count('rain');
   * // => 4
   */
  function count (subject) {
    return coerceToString(subject).length;
  }

  /**
   * Counts the characters in `subject` taking care of
   * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
   * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
   *
   * @function  countGrapheme
   * @static
   * @since 1.0.0
   * @memberOf Count
   * @param  {string} [subject=''] The string to count characters.
   * @return {number}              Returns the number of characters in `subject`.
   * @example
   * v.countGrapheme('cafe\u0301'); // or 'café'
   * // => 4
   *
   * v.countGrapheme('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
   * // => 2
   *
   * v.countGrapheme('rain');
   * // => 4
   */
  function countGrapheme (subject) {
    return coerceToString(subject).replace(REGEXP_COMBINING_MARKS, '*').replace(REGEXP_SURROGATE_PAIRS, '*').length;
  }

  /**
   * Counts the number of `substring` appearances in `subject`.
   *
   * @function countSubstring
   * @static
   * @since 1.0.0
   * @memberOf Count
   * @param  {string} [subject=''] The subject string.
   * @param  {string} substring    The substring to be counted.
   * @return {number}              Returns the number of `substring` appearances.
   * @example
   * v.countSubstring('bad boys, bad boys whatcha gonna do?', 'boys');
   * // => 2
   */
  function countSubstring (subject, substring) {
    var subjectString = coerceToString(subject),
        substringString = coerceToString(substring),
        count = 0,
        matchIndex = 0,
        substringLength = substringString.length;
    if (subjectString === '' || substringString === '') {
      return count;
    }
    do {
      matchIndex = subjectString.indexOf(substringString, matchIndex);
      if (matchIndex !== -1) {
        count++;
        matchIndex += substringLength;
      }
    } while (matchIndex !== -1);
    return count;
  }

  var reduce = Array.prototype.reduce;

  /**
   * Counts the characters in `subject` where `predicate` returns truthy.
   *
   * @function  countWhere
   * @static
   * @since 1.0.0
   * @memberOf Count
   * @param  {string}   [subject=''] The string to count characters.
   * @param  {Function} predicate    The predicate function invoked on each character with parameters `(character, index, string)`.
   * @param  {Object}   [context]    The context to invoke the `predicate`.
   * @return {number}                Returns the number of characters.
   * @example
   * v.countWhere('hola!', v.isAlpha);
   * // => 4
   *
   * v.countWhere('2022', function(character, index, str) {
   *   return character === '2';
   * });
   * // => 3
   */
  function countWhere (subject, predicate, context) {
    var subjectString = coerceToString(subject);
    if (subjectString === '' || typeof predicate !== 'function') {
      return 0;
    }
    var predicateWithContext = predicate.bind(context);
    return reduce.call(subjectString, function (countTruthy, character, index) {
      return predicateWithContext(character, index, subjectString) ? countTruthy + 1 : countTruthy;
    }, 0);
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /**
   * The class that creates index instances.
   * @ignore
   */

  var ReplacementIndex = function () {
    function ReplacementIndex() {
      classCallCheck(this, ReplacementIndex);

      /**
       * The current index.
       *
       * @ignore
       * @name ReplacementIndex#index
       * @type {number}
       */
      this.index = 0;
    }

    /**
     * Increment the current index.
     *
     * @ignore
     * @return {undefined}
     */


    createClass(ReplacementIndex, [{
      key: 'increment',
      value: function increment() {
        this.index++;
      }

      /**
       * Increment the current index by position.
       *
       * @ignore
       * @param {number} [position] The replacement position.
       * @return {undefined}
       */

    }, {
      key: 'incrementOnEmptyPosition',
      value: function incrementOnEmptyPosition(position) {
        if (isNil(position)) {
          this.increment();
        }
      }

      /**
       * Get the replacement index by position.
       *
       * @ignore
       * @param {number} [position] The replacement position.
       * @return {number} The replacement index.
       */

    }, {
      key: 'getIndexByPosition',
      value: function getIndexByPosition(position) {
        return isNil(position) ? this.index : position - 1;
      }
    }]);
    return ReplacementIndex;
  }();

  var Const = Object.freeze({
    // Type specifiers
    TYPE_INTEGER: 'i',
    TYPE_INTEGER_BINARY: 'b',
    TYPE_INTEGER_ASCII_CHARACTER: 'c',
    TYPE_INTEGER_DECIMAL: 'd',
    TYPE_INTEGER_OCTAL: 'o',
    TYPE_INTEGER_UNSIGNED_DECIMAL: 'u',
    TYPE_INTEGER_HEXADECIMAL: 'x',
    TYPE_INTEGER_HEXADECIMAL_UPPERCASE: 'X',
    TYPE_FLOAT_SCIENTIFIC: 'e',
    TYPE_FLOAT_SCIENTIFIC_UPPERCASE: 'E',
    TYPE_FLOAT: 'f',
    TYPE_FLOAT_SHORT: 'g',
    TYPE_FLOAT_SHORT_UPPERCASE: 'G',
    TYPE_STRING: 's',

    // Simple literals
    LITERAL_PERCENT: '%',
    LITERAL_SINGLE_QUOTE: "'",
    LITERAL_PLUS: '+',
    LITERAL_MINUS: '-',
    LITERAL_PERCENT_SPECIFIER: '%%',

    // Radix constants to format numbers
    RADIX_BINARY: 2,
    RADIX_OCTAL: 8,
    RADIX_DECIMAL: 10,
    RADIX_HEXADECIMAL: 16
  });

  /**
   * Repeats the `subject` number of `times`.
   *
   * @function repeat
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to repeat.
   * @param {number} [times=1] The number of times to repeat.
   * @return {string} Returns the repeated string.
   * @example
   * v.repeat('w', 3);
   * // => 'www'
   *
   * v.repeat('world', 0);
   * // => ''
   */
  function repeat (subject, times) {
    var subjectString = coerceToString(subject),
        timesInt = isNil(times) ? 1 : clipNumber(toInteger(times), 0, MAX_SAFE_INTEGER);
    var repeatString = '';
    while (timesInt) {
      if (timesInt & 1) {
        repeatString += subjectString;
      }
      if (timesInt > 1) {
        subjectString += subjectString;
      }
      timesInt >>= 1;
    }
    return repeatString;
  }

  /**
   * Creates the padding string.
   *
   * @ignore
   * @param {string} padCharacters The characters to create padding string.
   * @param {number} length The padding string length.
   * @return {string} The padding string.
   */
  function buildPadding (padCharacters, length) {
    var padStringRepeat = toInteger(length / padCharacters.length),
        padStringRest = length % padCharacters.length;
    return repeat(padCharacters, padStringRepeat + padStringRest).substr(0, length);
  }

  /**
   * Pads `subject` from left to a new `length`.
   *
   * @function padLeft
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to pad.
   * @param {int} [length=0] The length to left pad the string. No changes are made if `length` is less than `subject.length`.
   * @param {string} [pad=' '] The string to be used for padding.
   * @return {string} Returns the left padded string.
   * @example
   * v.padLeft('word', 6, '-');
   * // => '--word'
   *
   * v.padLeft('hi', 5, '-=');
   * // => '-=-hi'
   */
  function padLeft (subject, length, pad) {
    var subjectString = coerceToString(subject),
        lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
        padString = coerceToString(pad, ' ');
    if (lengthInt <= subjectString.length) {
      return subjectString;
    }
    return buildPadding(padString, lengthInt - subjectString.length) + subjectString;
  }

  /**
   * Pads `subject` from right to a new `length`.
   *
   * @function padRight
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to pad.
   * @param {int} [length=0] The length to right pad the string. No changes are made if `length` is less than `subject.length`.
   * @param {string} [pad=' '] The string to be used for padding.
   * @return {string} Returns the right padded string.
   * @example
   * v.padRight('word', 6, '-');
   * // => 'word--'
   *
   * v.padRight('hi', 5, '-=');
   * // => 'hi-=-'
   */
  function padRight (subject, length, pad) {
    var subjectString = coerceToString(subject),
        lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
        padString = coerceToString(pad, ' ');
    if (lengthInt <= subjectString.length) {
      return subjectString;
    }
    return subjectString + buildPadding(padString, lengthInt - subjectString.length);
  }

  /**
   * Aligns and pads `subject` string.
   *
   * @ignore
   * @param {string} subject The subject string.
   * @param {ConversionSpecification} conversion The conversion specification object.
   * @return {string} Returns the aligned and padded string.
   */
  function alignAndPad (subject, conversion) {
    var width = conversion.width;
    if (isNil(width) || subject.length >= width) {
      return subject;
    }
    var padType = conversion.alignmentSpecifier === Const.LITERAL_MINUS ? padRight : padLeft;
    return padType(subject, width, conversion.getPaddingCharacter());
  }

  /**
   * Add sign to the formatted number.
   *
   * @ignore
   * @name addSignToFormattedNumber
   * @param  {number} replacementNumber The number to be replaced.
   * @param  {string} formattedReplacement The formatted version of number.
   * @param  {ConversionSpecification} conversion The conversion specification object.
   * @return {string} Returns the formatted number string with a sign.
   */
  function addSignToFormattedNumber (replacementNumber, formattedReplacement, conversion) {
    if (conversion.signSpecifier === Const.LITERAL_PLUS && replacementNumber >= 0) {
      formattedReplacement = Const.LITERAL_PLUS + formattedReplacement;
    }
    return formattedReplacement;
  }

  /**
   * Formats a float type according to specifiers.
   *
   * @ignore
   * @param  {string} replacement The string to be formatted.
   * @param  {ConversionSpecification} conversion The conversion specification object.
   * @return {string} Returns the formatted string.
   */

  function formatFloat (replacement, conversion) {
    var replacementNumber = parseFloat(replacement),
        formattedReplacement;
    if (isNaN(replacementNumber)) {
      replacementNumber = 0;
    }
    var precision = coerceToNumber(conversion.precision, 6);
    switch (conversion.typeSpecifier) {
      case Const.TYPE_FLOAT:
        formattedReplacement = replacementNumber.toFixed(precision);
        break;
      case Const.TYPE_FLOAT_SCIENTIFIC:
        formattedReplacement = replacementNumber.toExponential(precision);
        break;
      case Const.TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
        formattedReplacement = replacementNumber.toExponential(precision).toUpperCase();
        break;
      case Const.TYPE_FLOAT_SHORT:
      case Const.TYPE_FLOAT_SHORT_UPPERCASE:
        formattedReplacement = formatFloatAsShort(replacementNumber, precision, conversion);
        break;
    }
    formattedReplacement = addSignToFormattedNumber(replacementNumber, formattedReplacement, conversion);
    return coerceToString(formattedReplacement);
  }

  /**
   * Formats the short float.
   *
   * @ignore
   * @param  {number} replacementNumber The number to format.
   * @param  {number} precision The precision to format the float.
   * @param  {ConversionSpecification} conversion The conversion specification object.
   * @return {string}  Returns the formatted short float.
   */
  function formatFloatAsShort(replacementNumber, precision, conversion) {
    if (replacementNumber === 0) {
      return '0';
    }
    var nonZeroPrecision = precision === 0 ? 1 : precision;
    var formattedReplacement = replacementNumber.toPrecision(nonZeroPrecision).replace(REGEXP_TRAILING_ZEROS, '');
    if (conversion.typeSpecifier === Const.TYPE_FLOAT_SHORT_UPPERCASE) {
      formattedReplacement = formattedReplacement.toUpperCase();
    }
    return formattedReplacement;
  }

  /**
   * Formats an integer type according to specifiers.
   *
   * @ignore
   * @param  {string} replacement The string to be formatted.
   * @param  {ConversionSpecification} conversion The conversion specification object.
   * @return {string} Returns the formatted string.
   */

  function formatIntegerBase (replacement, conversion) {
    var integer = parseInt(replacement);
    if (isNaN(integer)) {
      integer = 0;
    }
    integer = integer >>> 0;
    switch (conversion.typeSpecifier) {
      case Const.TYPE_INTEGER_ASCII_CHARACTER:
        integer = String.fromCharCode(integer);
        break;
      case Const.TYPE_INTEGER_BINARY:
        integer = integer.toString(Const.RADIX_BINARY);
        break;
      case Const.TYPE_INTEGER_OCTAL:
        integer = integer.toString(Const.RADIX_OCTAL);
        break;
      case Const.TYPE_INTEGER_HEXADECIMAL:
        integer = integer.toString(Const.RADIX_HEXADECIMAL);
        break;
      case Const.TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
        integer = integer.toString(Const.RADIX_HEXADECIMAL).toUpperCase();
        break;
    }
    return coerceToString(integer);
  }

  /**
   * Formats a decimal integer type according to specifiers.
   *
   * @ignore
   * @param  {string} replacement The string to be formatted.
   * @param  {ConversionSpecification} conversion The conversion specification object.
   * @return {string} Returns the formatted string.
   */

  function formatIntegerDecimal (replacement, conversion) {
    var integer = parseInt(replacement);
    if (isNaN(integer)) {
      integer = 0;
    }
    return addSignToFormattedNumber(integer, toString(integer), conversion);
  }

  /**
   * Formats a string type according to specifiers.
   *
   * @ignore
   * @param {string} replacement The string to be formatted.
   * @param {ConversionSpecification} conversion The conversion specification object.
   * @return {string} Returns the formatted string.
   */
  function formatString (replacement, conversion) {
    var formattedReplacement = replacement,
        precision = conversion.precision;
    if (!isNil(precision) && formattedReplacement.length > precision) {
      formattedReplacement = truncate(formattedReplacement, precision, '');
    }
    return formattedReplacement;
  }

  /**
   * Returns the computed string based on format specifiers.
   *
   * @ignore
   * @name computeReplacement
   * @param {string} replacement The replacement value.
   * @param {ConversionSpecification} conversion The conversion specification object.
   * @return {string} Returns the computed string.
   */
  function computeReplacement (replacement, conversion) {
    var formatFunction;
    switch (conversion.typeSpecifier) {
      case Const.TYPE_STRING:
        formatFunction = formatString;
        break;
      case Const.TYPE_INTEGER_DECIMAL:
      case Const.TYPE_INTEGER:
        formatFunction = formatIntegerDecimal;
        break;
      case Const.TYPE_INTEGER_ASCII_CHARACTER:
      case Const.TYPE_INTEGER_BINARY:
      case Const.TYPE_INTEGER_OCTAL:
      case Const.TYPE_INTEGER_HEXADECIMAL:
      case Const.TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
      case Const.TYPE_INTEGER_UNSIGNED_DECIMAL:
        formatFunction = formatIntegerBase;
        break;
      case Const.TYPE_FLOAT:
      case Const.TYPE_FLOAT_SCIENTIFIC:
      case Const.TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
      case Const.TYPE_FLOAT_SHORT:
      case Const.TYPE_FLOAT_SHORT_UPPERCASE:
        formatFunction = formatFloat;
        break;
    }
    var formattedString = formatFunction(replacement, conversion);
    return alignAndPad(formattedString, conversion);
  }

  /**
   * @ignore
   */

  var ConversionSpecification = function () {

    /**
     * Construct the new conversion specification object.
     *
     * @ignore
     * @param {Object} properties An object with properties to initialize.
     */
    function ConversionSpecification(properties) {
      classCallCheck(this, ConversionSpecification);


      /**
       * The percent characters from conversion specification.
       *
       * @ignore
       * @name ConversionSpecification#percent
       * @type {string}
       */
      this.percent = properties.percent;

      /**
       *  The sign specifier to force a sign to be used on a number.
       *
       * @ignore
       * @name ConversionSpecification#signSpecifier
       * @type {string}
       */
      this.signSpecifier = properties.signSpecifier;

      /**
       * The padding specifier that says what padding character will be used.
       *
       * @ignore
       * @name ConversionSpecification#paddingSpecifier
       * @type {string}
       */
      this.paddingSpecifier = properties.paddingSpecifier;

      /**
       * The alignment specifier that says if the result should be left-justified or right-justified.
       *
       * @ignore
       * @name ConversionSpecification#alignmentSpecifier
       * @type {string}
       */
      this.alignmentSpecifier = properties.alignmentSpecifier;

      /**
       * The width specifier how many characters this conversion should result in.
       *
       * @ignore
       * @name ConversionSpecification#width
       * @type {number}
       */
      this.width = properties.width;

      /**
       * The precision specifier says how many decimal digits should be displayed for floating-point numbers.
       *
       * @ignore
       * @name ConversionSpecification#precision
       * @type {number}
       */
      this.precision = properties.precision;

      /**
       * The type specifier says what type the argument data should be treated as.
       *
       * @ignore
       * @name ConversionSpecification#typeSpecifier
       * @type {string}
       */
      this.typeSpecifier = properties.typeSpecifier;
    }

    /**
     * Check if the conversion specification is a percent literal "%%".
     *
     * @ignore
     * @return {boolean} Returns true if the conversion is a percent literal, false otherwise.
     */


    createClass(ConversionSpecification, [{
      key: 'isPercentLiteral',
      value: function isPercentLiteral() {
        return Const.LITERAL_PERCENT_SPECIFIER === this.percent;
      }

      /**
       * Get the padding character from padding specifier.
       *
       * @ignore
       * @returns {string} Returns the padding character.
       */

    }, {
      key: 'getPaddingCharacter',
      value: function getPaddingCharacter() {
        var paddingCharacter = nilDefault(this.paddingSpecifier, ' ');
        if (paddingCharacter.length === 2 && paddingCharacter[0] === Const.LITERAL_SINGLE_QUOTE) {
          paddingCharacter = paddingCharacter[1];
        }
        return paddingCharacter;
      }
    }]);
    return ConversionSpecification;
  }();

  /**
   * Validates the specifier type and replacement position.
   *
   * @ignore
   * @throws {Error} Throws an exception on insufficient arguments or unknown specifier.
   * @param  {number} index The index of the matched specifier.
   * @param  {number} replacementsLength The number of replacements.
   * @param  {ConversionSpecification} conversion The conversion specification object.
   * @return {undefined}
   */
  function validateReplacement (index, replacementsLength, conversion) {
    if (isNil(conversion.typeSpecifier)) {
      throw new Error('sprintf(): Unknown type specifier');
    }
    if (index > replacementsLength - 1) {
      throw new Error('sprintf(): Too few arguments');
    }
    if (index < 0) {
      throw new Error('sprintf(): Argument number must be greater than zero');
    }
  }

  /**
   * Return the replacement for regular expression match of the conversion specification.
   *
   * @ignore
   * @name matchReplacement
   * @param {ReplacementIndex} replacementIndex The replacement index object.
   * @param {string[]} replacements The array of replacements.
   * @param {string} conversionSpecification The conversion specification.
   * @param {string} percent The percent characters from conversion specification.
   * @param {string} position The position to insert the replacement.
   * @param {string} signSpecifier The sign specifier to force a sign to be used on a number.
   * @param {string} paddingSpecifier The padding specifier that says what padding character will be used.
   * @param {string} alignmentSpecifier The alignment specifier that says if the result should be left-justified or right-justified.
   * @param {string} widthSpecifier The width specifier how many characters this conversion should result in.
   * @param {string} precisionSpecifier The precision specifier says how many decimal digits should be displayed for floating-point numbers.
   * @param {string} typeSpecifier The type specifier says what type the argument data should be treated as.
   * @return {string} Returns the computed replacement.
   */
  function replacementMatch (replacementIndex, replacements, conversionSpecification, percent, position, signSpecifier, paddingSpecifier, alignmentSpecifier, widthSpecifier, precisionSpecifier, typeSpecifier) {
    var conversion = new ConversionSpecification({
      percent: percent,
      signSpecifier: signSpecifier,
      paddingSpecifier: paddingSpecifier,
      alignmentSpecifier: alignmentSpecifier,
      width: coerceToNumber(widthSpecifier, null),
      precision: coerceToNumber(precisionSpecifier, null),
      typeSpecifier: typeSpecifier
    });
    if (conversion.isPercentLiteral()) {
      return conversionSpecification.slice(1);
    }
    var actualReplacementIndex = replacementIndex.getIndexByPosition(position);
    replacementIndex.incrementOnEmptyPosition(position);
    validateReplacement(actualReplacementIndex, replacements.length, conversion);
    return computeReplacement(replacements[actualReplacementIndex], conversion);
  }

  /**
   * Produces a string according to `format`.
   *
   * <div id="sprintf-format" class="smaller">
   * `format` string is composed of zero or more directives: ordinary characters (not <code>%</code>), which are  copied  unchanged
   * to  the  output string and <i>conversion specifications</i>, each of which results in fetching zero or more subsequent
   * arguments. Each <b>conversion specification</b> is introduced by the character <code>%</code>, and ends with a <b>conversion
   * specifier</b>. In between there may be (in this order) zero or more <b>flags</b>, an optional <b>minimum field width</b>
   * and an optional <b>precision</b>.<br/>
   * By default, the arguments are used in the given order.<br/>
   * For argument numbering and swapping, `%m$` (where `m` is a number indicating the argument order)
   * is used instead of `%` to specify explicitly which argument is taken.<br/><br/>
   *
   * <b>The flag characters</b><br/>
   * The character <code>%</code> is followed by zero or more of the following flags:<br/>
   * <table class="light-params">
   *   <tr>
   *     <td><code>+</code></td>
   *     <td>
   *       A  sign (<code>+</code> or <code>-</code>) should always be placed before a number produced by a
   *       signed conversion. By default a sign is used only for negative numbers.
   *     </td>
   *   </tr>
   *   <tr>
   *     <td><code>0</code></td>
   *     <td>The value should be zero padded.</td>
   *   </tr>
   *   <tr>
   *     <td><code>&blank;</code></td>
   *     <td>(a space) The value should be space padded.</td>
   *   </tr>
   *   <tr>
   *    <td><code>'</code></td>
   *    <td>Indicates alternate padding character, specified by prefixing it with a single quote <code>'</code>.</td>
   *   </tr>
   *   <tr>
   *     <td><code>-</code></td>
   *     <td>The converted value is to be left adjusted on the field boundary (the default is right justification).</td>
   *   </tr>
   * </table>
   *
   * <b>The field width</b><br/>
   * An  optional decimal digit string (with nonzero first digit) specifying a minimum field width.  If the converted
   * value has fewer characters than the field width, it will be padded with spaces on the left (or right, if the
   * left-adjustment flag has been given).<br/><br/>
   *
   * <b>The precision</b><br/>
   * An optional precision, in the form of a period `.` followed by an optional decimal digit string.<br/>
   * This gives the number of digits to appear after the radix character for `e`, `E`, `f` and `F` conversions, the
   * maximum number of significant digits for `g` and `G` conversions or the maximum number of characters to be printed
   * from a string for `s` conversion.<br/><br/>
   *
   * <b>The conversion specifier</b><br/>
   * A specifier that mentions what type the argument should be treated as:
   *
   * <table class="light-params">
   *   <tr>
   *     <td>`s`</td>
   *     <td>The string argument is treated as and presented as a string.</td>
   *   </tr>
   *   <tr>
   *     <td>`d` `i`</td>
   *     <td>The integer argument is converted to signed decimal notation.</td>
   *   </tr>
   *   <tr>
   *     <td>`b`</td>
   *     <td>The unsigned integer argument is converted to unsigned binary.</td>
   *   </tr>
   *   <tr>
   *     <td>`c`</td>
   *     <td>The unsigned integer argument is converted to an ASCII character with that number.</td>
   *   </tr>
   *   <tr>
   *     <td>`o`</td>
   *     <td>The unsigned integer argument is converted to unsigned octal.</td>
   *   </tr>
   *   <tr>
   *     <td>`u`</td>
   *     <td>The unsigned integer argument is converted to unsigned decimal.</td>
   *   </tr>
   *   <tr>
   *     <td>`x` `X`</td>
   *     <td>The unsigned integer argument is converted to unsigned hexadecimal. The letters `abcdef` are used for `x`
   *     conversions; the letters `ABCDEF` are used for `X` conversions.</td>
   *   </tr>
   *   <tr>
   *     <td>`f`</td>
   *     <td>
   *      The float argument is rounded and converted to decimal notation in the style `[-]ddd.ddd`, where the number of
   *      digits after the decimal-point character is equal to the precision specification. If the precision is missing,
   *      it is taken as 6; if the precision is explicitly zero, no decimal-point character appears.
   *      If a decimal point appears, at least one digit appears before it.
   *     </td>
   *   </tr>
   *   <tr>
   *     <td>`e` `E`</td>
   *     <td>
   *       The float argument is rounded and converted in the style `[-]d.ddde±dd`, where there is one digit
   *       before the decimal-point character and the number of digits after it is equal to the precision. If
   *       the precision is missing, it is taken as `6`; if the precision is zero, no decimal-point character
   *       appears. An `E` conversion uses the letter `E` (rather than `e`) to introduce the exponent.
   *     </td>
   *   </tr>
   *   <tr>
   *     <td>`g` `G`</td>
   *     <td>
   *       The float argument is converted in style `f` or `e` (or `F` or `E` for `G` conversions). The precision specifies
   *       the number of significant digits. If the precision is missing, `6` digits are given; if the
   *       precision is zero, it is treated as `1`. Style `e` is used if the exponent from its conversion is less
   *       than `-6` or greater than or equal to the precision. Trailing zeros are removed from the fractional
   *       part of the result; a decimal point appears only if it is followed by at least one digit.
   *     </td>
   *   </tr>
   *   <tr>
   *     <td>`%`</td>
   *     <td>A literal `%` is written. No argument is converted. The complete conversion specification is `%%`.</td>
   *   </tr>
   *
   * </table>
   * </div>
   *
   * @function sprintf
   * @static
   * @since 1.0.0
   * @memberOf Format
   * @param  {string} [format=''] The format string.
   * @param  {...*}               replacements The replacements to produce the string.
   * @return {string}             Returns the produced string.
   * @example
   * v.sprintf('Hello %s!', 'World');
   * // => 'Hello World!'
   *
   * v.sprintf("%.4s the %'!-8s", 'Alexander', 'Great');
   * // => 'Alex the Great!!!'
   *
   * v.sprintf('%2$s the %1$s', 'Great', 'Alexander');
   * // => 'Alexander the Great'
   *
   * v.sprintf('%d %i %+d', 15, -2, 25);
   * // => '15 -2 +25'
   *
   * v.sprintf('0b%b 0%o 0x%x', 12, 9, 15);
   * // => '0b1100 011 0xf'
   *
   * v.sprintf('%.1f %06.2f', 1.46, 8.7);
   * // => '1.5 008.70'
   *
   * v.sprintf('%.2e %g', 100.5, 0.455);
   * // => '1.01e+2 0.455'
   * 
   */
  function sprintf (format) {
    var formatString = coerceToString(format);
    if (formatString === '') {
      return formatString;
    }

    for (var _len = arguments.length, replacements = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      replacements[_key - 1] = arguments[_key];
    }

    var boundReplacementMatch = replacementMatch.bind(undefined, new ReplacementIndex(), replacements);
    return formatString.replace(REGEXP_CONVERSION_SPECIFICATION, boundReplacementMatch);
  }

  /**
   * Produces a string according to `format`. Works exactly like <a href="#sprintf"><code>sprintf()</code></a>,
   * with the only difference that accepts the formatting arguments in an array `values`.<br/>
   * See <a href="#sprintf-format">here</a> `format` string specifications.
   *
   * @function vprintf
   * @static
   * @since 1.0.0
   * @memberOf Format
   * @param  {string}                [format='']  The format string.
   * @param  {Array.<number|string>} replacements The array of replacements to produce the string.
   * @return {string}                             Returns the produced string.
   * @example
   * vprintf('%s', ['Welcome'])
   * // => 'Welcome'
   *
   * vprintf('%s costs $%.2f', ['Coffee', 1.5]);
   * // => 'Coffee costs $1.50'
   */
  function vprintf (format, replacements) {
    return sprintf.apply(undefined, [format].concat(toConsumableArray(nilDefault(replacements, []))));
  }

  var escapeCharactersMap = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };

  /**
   * Return the escaped version of `character`.
   *
   * @ignore
   * @param  {string} character The character to be escape.
   * @return {string}           The escaped version of character.
   */
  function replaceSpecialCharacter(character) {
    return escapeCharactersMap[character];
  }

  /**
   * Escapes HTML special characters  <code>< > & ' " `</code> in <code>subject</code>.
   *
   * @function escapeHtml
   * @static
   * @since 1.0.0         
   * @memberOf Escape
   * @param {string} [subject=''] The string to escape.
   * @return {string} Returns the escaped string.
   * @example
   * v.escapeHtml('<p>wonderful world</p>');
   * // => '&lt;p&gt;wonderful world&lt;/p&gt;'
   */
  function escapeHtml (subject) {
    return coerceToString(subject).replace(REGEXP_HTML_SPECIAL_CHARACTERS, replaceSpecialCharacter);
  }

  /**
   * Escapes the regular expression special characters `- [ ] / { } ( ) * + ? . \ ^ $ |` in `subject`.
   *
   * @function escapeRegExp
   * @static
   * @since 1.0.0
   * @memberOf Escape
   * @param {string} [subject=''] The string to escape.
   * @return {string} Returns the escaped string.
   * @example
   * v.escapeRegExp('(hours)[minutes]{seconds}');
   * // => '\(hours\)\[minutes\]\{seconds\}'
   */
  function escapeRegExp (subject) {
    return coerceToString(subject).replace(REGEXP_SPECIAL_CHARACTERS, '\\$&');
  }

  var unescapeCharactersMap = {
    '<': /(&lt;)|(&#x0*3c;)|(&#0*60;)/gi,
    '>': /(&gt;)|(&#x0*3e;)|(&#0*62;)/gi,
    '&': /(&amp;)|(&#x0*26;)|(&#0*38;)/gi,
    '"': /(&quot;)|(&#x0*22;)|(&#0*34;)/gi,
    "'": /(&#x0*27;)|(&#0*39;)/gi,
    '`': /(&#x0*60;)|(&#0*96;)/gi
  };
  var characters = Object.keys(unescapeCharactersMap);

  /**
   * Replaces the HTML entities with corresponding characters.
   *
   * @ignore
   * @param  {string} string The accumulator string.
   * @param  {string} key    The character.
   * @return {string}        The string with replaced HTML entity
   */
  function reduceUnescapedString(string, key) {
    return string.replace(unescapeCharactersMap[key], key);
  }

  /**
   * Unescapes HTML special characters from <code>&amp;lt; &amp;gt; &amp;amp; &amp;quot; &amp;#x27; &amp;#x60;</code>
   * to corresponding <code>< > & ' " `</code> in <code>subject</code>.
   *
   * @function unescapeHtml
   * @static
   * @since 1.0.0
   * @memberOf Escape
   * @param  {string} [subject=''] The string to unescape.
   * @return {string}              Returns the unescaped string.
   * @example
   * v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;');
   * // => '<p>wonderful world</p>'
   */
  function unescapeHtml (subject) {
    var subjectString = coerceToString(subject);
    return characters.reduce(reduceUnescapedString, subjectString);
  }

  /**
   * Returns the first occurrence index of `search` in `subject`.
   *
   * @function indexOf
   * @static
   * @since 1.0.0
   * @memberOf Index
   * @param {string} [subject=''] The string where to search.
   * @param {string} search The string to search.
   * @param {number} [fromIndex=0] The index to start searching.
   * @return {number} Returns the first occurrence index or `-1` if not found.
   * @example
   * v.indexOf('morning', 'n');
   * // => 3
   *
   * v.indexOf('evening', 'o');
   * // => -1
   */
  function indexOf (subject, search, fromIndex) {
    var subjectString = coerceToString(subject);
    return subjectString.indexOf(search, fromIndex);
  }

  /**
   * Returns the last occurrence index of `search` in `subject`.
   *
   * @function lastIndexOf
   * @static
   * @since 1.0.0
   * @memberOf Index
   * @param {string} [subject=''] The string where to search.
   * @param {string} search The string to search.
   * @param {number} [fromIndex=subject.length - 1] The index to start searching backward in the string.
   * @return {number} Returns the last occurrence index or `-1` if not found.
   * @example
   * v.lastIndexOf('morning', 'n');
   * // => 5
   *
   * v.lastIndexOf('evening', 'o');
   * // => -1
   */
  function lastIndexOf (subject, search, fromIndex) {
    var subjectString = coerceToString(subject);
    return subjectString.lastIndexOf(search, fromIndex);
  }

  /**
   * Returns the first index of a `pattern` match in `subject`.
   *
   * @function search
   * @static
   * @since 1.0.0
   * @memberOf Index
   * @param {string} [subject=''] The string where to search.
   * @param {string|RegExp} pattern The pattern to match. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern)`.
   * @param {number} [fromIndex=0] The index to start searching.
   * @return {number} Returns the first match index or `-1` if not found.
   * @example
   * v.search('morning', /rn/);
   * // => 2
   *
   * v.search('evening', '/\d/');
   * // => -1
   */
  function search (subject, pattern, fromIndex) {
    var subjectString = coerceToString(subject),
        fromIndexNumber = isNil(fromIndex) ? 0 : clipNumber(toInteger(fromIndex), 0, subjectString.length);
    var matchIndex = subjectString.substr(fromIndexNumber).search(pattern);
    if (matchIndex !== -1 && !isNaN(fromIndexNumber)) {
      matchIndex += fromIndexNumber;
    }
    return matchIndex;
  }

  /**
   * Generated diacritics map. See bellow the base code.
   * @ignore
   * @see http://stackoverflow.com/a/18391901/1894471
   * @type Object
   */

  var diacriticMap = {
    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D",
    "E": "E",
    "F": "F",
    "G": "G",
    "H": "H",
    "I": "I",
    "J": "J",
    "K": "K",
    "L": "L",
    "M": "M",
    "N": "N",
    "O": "O",
    "P": "P",
    "Q": "Q",
    "R": "R",
    "S": "S",
    "T": "T",
    "U": "U",
    "V": "V",
    "W": "W",
    "X": "X",
    "Y": "Y",
    "Z": "Z",
    "a": "a",
    "b": "b",
    "c": "c",
    "d": "d",
    "e": "e",
    "f": "f",
    "g": "g",
    "h": "h",
    "i": "i",
    "j": "j",
    "k": "k",
    "l": "l",
    "m": "m",
    "n": "n",
    "o": "o",
    "p": "p",
    "q": "q",
    "r": "r",
    "s": "s",
    "t": "t",
    "u": "u",
    "v": "v",
    "w": "w",
    "x": "x",
    "y": "y",
    "z": "z",
    "": "OE",
    "": "oe",
    "À": "A",
    "Á": "A",
    "Â": "A",
    "Ã": "A",
    "Ä": "A",
    "Å": "A",
    "Æ": "AE",
    "Ç": "C",
    "È": "E",
    "É": "E",
    "Ê": "E",
    "Ë": "E",
    "Ì": "I",
    "Í": "I",
    "Î": "I",
    "Ï": "I",
    "Ñ": "N",
    "Ò": "O",
    "Ó": "O",
    "Ô": "O",
    "Õ": "O",
    "Ö": "O",
    "Ø": "O",
    "Ù": "U",
    "Ú": "U",
    "Û": "U",
    "Ü": "U",
    "Ý": "Y",
    "ß": "s",
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "ä": "a",
    "å": "a",
    "æ": "ae",
    "ç": "c",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ë": "e",
    "ì": "i",
    "í": "i",
    "î": "i",
    "ï": "i",
    "ñ": "n",
    "ò": "o",
    "ó": "o",
    "ô": "o",
    "õ": "o",
    "ö": "o",
    "ø": "o",
    "ù": "u",
    "ú": "u",
    "û": "u",
    "ü": "u",
    "ý": "y",
    "ÿ": "y",
    "Ā": "A",
    "ā": "a",
    "Ă": "A",
    "ă": "a",
    "Ą": "A",
    "ą": "a",
    "Ć": "C",
    "ć": "c",
    "Ĉ": "C",
    "ĉ": "c",
    "Ċ": "C",
    "ċ": "c",
    "Č": "C",
    "č": "c",
    "Ď": "D",
    "ď": "d",
    "Đ": "D",
    "đ": "d",
    "Ē": "E",
    "ē": "e",
    "Ĕ": "E",
    "ĕ": "e",
    "Ė": "E",
    "ė": "e",
    "Ę": "E",
    "ę": "e",
    "Ě": "E",
    "ě": "e",
    "Ĝ": "G",
    "ĝ": "g",
    "Ğ": "G",
    "ğ": "g",
    "Ġ": "G",
    "ġ": "g",
    "Ģ": "G",
    "ģ": "g",
    "Ĥ": "H",
    "ĥ": "h",
    "Ħ": "H",
    "ħ": "h",
    "Ĩ": "I",
    "ĩ": "i",
    "Ī": "I",
    "ī": "i",
    "Ĭ": "I",
    "ĭ": "i",
    "Į": "I",
    "į": "i",
    "İ": "I",
    "ı": "i",
    "Ĵ": "J",
    "ĵ": "j",
    "Ķ": "K",
    "ķ": "k",
    "Ĺ": "L",
    "ĺ": "l",
    "Ļ": "L",
    "ļ": "l",
    "Ľ": "L",
    "ľ": "l",
    "Ŀ": "L",
    "ŀ": "l",
    "Ł": "L",
    "ł": "l",
    "Ń": "N",
    "ń": "n",
    "Ņ": "N",
    "ņ": "n",
    "Ň": "N",
    "ň": "n",
    "ŉ": "n",
    "Ō": "O",
    "ō": "o",
    "Ŏ": "O",
    "ŏ": "o",
    "Ő": "O",
    "ő": "o",
    "Œ": "OE",
    "œ": "oe",
    "Ŕ": "R",
    "ŕ": "r",
    "Ŗ": "R",
    "ŗ": "r",
    "Ř": "R",
    "ř": "r",
    "Ś": "S",
    "ś": "s",
    "Ŝ": "S",
    "ŝ": "s",
    "Ş": "S",
    "ş": "s",
    "Š": "S",
    "š": "s",
    "Ţ": "T",
    "ţ": "t",
    "Ť": "T",
    "ť": "t",
    "Ŧ": "T",
    "ŧ": "t",
    "Ũ": "U",
    "ũ": "u",
    "Ū": "U",
    "ū": "u",
    "Ŭ": "U",
    "ŭ": "u",
    "Ů": "U",
    "ů": "u",
    "Ű": "U",
    "ű": "u",
    "Ų": "U",
    "ų": "u",
    "Ŵ": "W",
    "ŵ": "w",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Ź": "Z",
    "ź": "z",
    "Ż": "Z",
    "ż": "z",
    "Ž": "Z",
    "ž": "z",
    "ſ": "l",
    "ƀ": "b",
    "Ɓ": "B",
    "Ƃ": "B",
    "ƃ": "b",
    "Ɔ": "O",
    "Ƈ": "C",
    "ƈ": "c",
    "Ɖ": "D",
    "Ɗ": "D",
    "Ƌ": "D",
    "ƌ": "d",
    "Ǝ": "E",
    "Ɛ": "E",
    "Ƒ": "F",
    "ƒ": "f",
    "Ɠ": "G",
    "ƕ": "hv",
    "Ɨ": "I",
    "Ƙ": "K",
    "ƙ": "k",
    "ƚ": "l",
    "Ɯ": "M",
    "Ɲ": "N",
    "ƞ": "n",
    "Ɵ": "O",
    "Ơ": "O",
    "ơ": "o",
    "Ƣ": "OI",
    "ƣ": "oi",
    "Ƥ": "P",
    "ƥ": "p",
    "Ƭ": "T",
    "ƭ": "t",
    "Ʈ": "T",
    "Ư": "U",
    "ư": "u",
    "Ʋ": "V",
    "Ƴ": "Y",
    "ƴ": "y",
    "Ƶ": "Z",
    "ƶ": "z",
    "Ǆ": "DZ",
    "ǅ": "Dz",
    "ǆ": "dz",
    "Ǉ": "LJ",
    "ǈ": "Lj",
    "ǉ": "lj",
    "Ǌ": "NJ",
    "ǋ": "Nj",
    "ǌ": "nj",
    "Ǎ": "A",
    "ǎ": "a",
    "Ǐ": "I",
    "ǐ": "i",
    "Ǒ": "O",
    "ǒ": "o",
    "Ǔ": "U",
    "ǔ": "u",
    "Ǖ": "U",
    "ǖ": "u",
    "Ǘ": "U",
    "ǘ": "u",
    "Ǚ": "U",
    "ǚ": "u",
    "Ǜ": "U",
    "ǜ": "u",
    "ǝ": "e",
    "Ǟ": "A",
    "ǟ": "a",
    "Ǡ": "A",
    "ǡ": "a",
    "Ǣ": "AE",
    "ǣ": "ae",
    "Ǥ": "G",
    "ǥ": "g",
    "Ǧ": "G",
    "ǧ": "g",
    "Ǩ": "K",
    "ǩ": "k",
    "Ǫ": "O",
    "ǫ": "o",
    "Ǭ": "O",
    "ǭ": "o",
    "ǰ": "j",
    "Ǳ": "DZ",
    "ǲ": "Dz",
    "ǳ": "dz",
    "Ǵ": "G",
    "ǵ": "g",
    "Ǹ": "N",
    "ǹ": "n",
    "Ǻ": "A",
    "ǻ": "a",
    "Ǽ": "AE",
    "ǽ": "ae",
    "Ǿ": "O",
    "ǿ": "o",
    "Ȁ": "A",
    "ȁ": "a",
    "Ȃ": "A",
    "ȃ": "a",
    "Ȅ": "E",
    "ȅ": "e",
    "Ȇ": "E",
    "ȇ": "e",
    "Ȉ": "I",
    "ȉ": "i",
    "Ȋ": "I",
    "ȋ": "i",
    "Ȍ": "O",
    "ȍ": "o",
    "Ȏ": "O",
    "ȏ": "o",
    "Ȑ": "R",
    "ȑ": "r",
    "Ȓ": "R",
    "ȓ": "r",
    "Ȕ": "U",
    "ȕ": "u",
    "Ȗ": "U",
    "ȗ": "u",
    "Ș": "S",
    "ș": "s",
    "Ț": "T",
    "ț": "t",
    "Ȟ": "H",
    "ȟ": "h",
    "Ƞ": "N",
    "Ȣ": "OU",
    "ȣ": "ou",
    "Ȥ": "Z",
    "ȥ": "z",
    "Ȧ": "A",
    "ȧ": "a",
    "Ȩ": "E",
    "ȩ": "e",
    "Ȫ": "O",
    "ȫ": "o",
    "Ȭ": "O",
    "ȭ": "o",
    "Ȯ": "O",
    "ȯ": "o",
    "Ȱ": "O",
    "ȱ": "o",
    "Ȳ": "Y",
    "ȳ": "y",
    "Ⱥ": "A",
    "Ȼ": "C",
    "ȼ": "c",
    "Ƚ": "L",
    "Ⱦ": "T",
    "ȿ": "s",
    "ɀ": "z",
    "Ƀ": "B",
    "Ʉ": "U",
    "Ʌ": "V",
    "ɇ": "e",
    "Ɉ": "J",
    "ɉ": "j",
    "Ɋ": "Q",
    "ɋ": "q",
    "Ɍ": "R",
    "ɍ": "r",
    "Ɏ": "Y",
    "ɏ": "y",
    "ɐ": "a",
    "ɓ": "b",
    "ɔ": "o",
    "ɖ": "d",
    "ɗ": "d",
    "ɛ": "e",
    "ɠ": "g",
    "ɥ": "h",
    "ɨ": "i",
    "ɫ": "l",
    "ɯ": "m",
    "ɱ": "m",
    "ɲ": "n",
    "ɵ": "o",
    "ɽ": "r",
    "ʈ": "t",
    "ʉ": "u",
    "ʋ": "v",
    "ʌ": "v",
    "ᵹ": "g",
    "ᵽ": "p",
    "Ḁ": "A",
    "ḁ": "a",
    "Ḃ": "B",
    "ḃ": "b",
    "Ḅ": "B",
    "ḅ": "b",
    "Ḇ": "B",
    "ḇ": "b",
    "Ḉ": "C",
    "ḉ": "c",
    "Ḋ": "D",
    "ḋ": "d",
    "Ḍ": "D",
    "ḍ": "d",
    "Ḏ": "D",
    "ḏ": "d",
    "Ḑ": "D",
    "ḑ": "d",
    "Ḓ": "D",
    "ḓ": "d",
    "Ḕ": "E",
    "ḕ": "e",
    "Ḗ": "E",
    "ḗ": "e",
    "Ḙ": "E",
    "ḙ": "e",
    "Ḛ": "E",
    "ḛ": "e",
    "Ḝ": "E",
    "ḝ": "e",
    "Ḟ": "F",
    "ḟ": "f",
    "Ḡ": "G",
    "ḡ": "g",
    "Ḣ": "H",
    "ḣ": "h",
    "Ḥ": "H",
    "ḥ": "h",
    "Ḧ": "H",
    "ḧ": "h",
    "Ḩ": "H",
    "ḩ": "h",
    "Ḫ": "H",
    "ḫ": "h",
    "Ḭ": "I",
    "ḭ": "i",
    "Ḯ": "I",
    "ḯ": "i",
    "Ḱ": "K",
    "ḱ": "k",
    "Ḳ": "K",
    "ḳ": "k",
    "Ḵ": "K",
    "ḵ": "k",
    "Ḷ": "L",
    "ḷ": "l",
    "Ḹ": "L",
    "ḹ": "l",
    "Ḻ": "L",
    "ḻ": "l",
    "Ḽ": "L",
    "ḽ": "l",
    "Ḿ": "M",
    "ḿ": "m",
    "Ṁ": "M",
    "ṁ": "m",
    "Ṃ": "M",
    "ṃ": "m",
    "Ṅ": "N",
    "ṅ": "n",
    "Ṇ": "N",
    "ṇ": "n",
    "Ṉ": "N",
    "ṉ": "n",
    "Ṋ": "N",
    "ṋ": "n",
    "Ṍ": "O",
    "ṍ": "o",
    "Ṏ": "O",
    "ṏ": "o",
    "Ṑ": "O",
    "ṑ": "o",
    "Ṓ": "O",
    "ṓ": "o",
    "Ṕ": "P",
    "ṕ": "p",
    "Ṗ": "P",
    "ṗ": "p",
    "Ṙ": "R",
    "ṙ": "r",
    "Ṛ": "R",
    "ṛ": "r",
    "Ṝ": "R",
    "ṝ": "r",
    "Ṟ": "R",
    "ṟ": "r",
    "Ṡ": "S",
    "ṡ": "s",
    "Ṣ": "S",
    "ṣ": "s",
    "Ṥ": "S",
    "ṥ": "s",
    "Ṧ": "S",
    "ṧ": "s",
    "Ṩ": "S",
    "ṩ": "s",
    "Ṫ": "T",
    "ṫ": "t",
    "Ṭ": "T",
    "ṭ": "t",
    "Ṯ": "T",
    "ṯ": "t",
    "Ṱ": "T",
    "ṱ": "t",
    "Ṳ": "U",
    "ṳ": "u",
    "Ṵ": "U",
    "ṵ": "u",
    "Ṷ": "U",
    "ṷ": "u",
    "Ṹ": "U",
    "ṹ": "u",
    "Ṻ": "U",
    "ṻ": "u",
    "Ṽ": "V",
    "ṽ": "v",
    "Ṿ": "V",
    "ṿ": "v",
    "Ẁ": "W",
    "ẁ": "w",
    "Ẃ": "W",
    "ẃ": "w",
    "Ẅ": "W",
    "ẅ": "w",
    "Ẇ": "W",
    "ẇ": "w",
    "Ẉ": "W",
    "ẉ": "w",
    "Ẋ": "X",
    "ẋ": "x",
    "Ẍ": "X",
    "ẍ": "x",
    "Ẏ": "Y",
    "ẏ": "y",
    "Ẑ": "Z",
    "ẑ": "z",
    "Ẓ": "Z",
    "ẓ": "z",
    "Ẕ": "Z",
    "ẕ": "z",
    "ẖ": "h",
    "ẗ": "t",
    "ẘ": "w",
    "ẙ": "y",
    "ẚ": "a",
    "ẛ": "s",
    "ẞ": "S",
    "Ạ": "A",
    "ạ": "a",
    "Ả": "A",
    "ả": "a",
    "Ấ": "A",
    "ấ": "a",
    "Ầ": "A",
    "ầ": "a",
    "Ẩ": "A",
    "ẩ": "a",
    "Ẫ": "A",
    "ẫ": "a",
    "Ậ": "A",
    "ậ": "a",
    "Ắ": "A",
    "ắ": "a",
    "Ằ": "A",
    "ằ": "a",
    "Ẳ": "A",
    "ẳ": "a",
    "Ẵ": "A",
    "ẵ": "a",
    "Ặ": "A",
    "ặ": "a",
    "Ẹ": "E",
    "ẹ": "e",
    "Ẻ": "E",
    "ẻ": "e",
    "Ẽ": "E",
    "ẽ": "e",
    "Ế": "E",
    "ế": "e",
    "Ề": "E",
    "ề": "e",
    "Ể": "E",
    "ể": "e",
    "Ễ": "E",
    "ễ": "e",
    "Ệ": "E",
    "ệ": "e",
    "Ỉ": "I",
    "ỉ": "i",
    "Ị": "I",
    "ị": "i",
    "Ọ": "O",
    "ọ": "o",
    "Ỏ": "O",
    "ỏ": "o",
    "Ố": "O",
    "ố": "o",
    "Ồ": "O",
    "ồ": "o",
    "Ổ": "O",
    "ổ": "o",
    "Ỗ": "O",
    "ỗ": "o",
    "Ộ": "O",
    "ộ": "o",
    "Ớ": "O",
    "ớ": "o",
    "Ờ": "O",
    "ờ": "o",
    "Ở": "O",
    "ở": "o",
    "Ỡ": "O",
    "ỡ": "o",
    "Ợ": "O",
    "ợ": "o",
    "Ụ": "U",
    "ụ": "u",
    "Ủ": "U",
    "ủ": "u",
    "Ứ": "U",
    "ứ": "u",
    "Ừ": "U",
    "ừ": "u",
    "Ử": "U",
    "ử": "u",
    "Ữ": "U",
    "ữ": "u",
    "Ự": "U",
    "ự": "u",
    "Ỳ": "Y",
    "ỳ": "y",
    "Ỵ": "Y",
    "ỵ": "y",
    "Ỷ": "Y",
    "ỷ": "y",
    "Ỹ": "Y",
    "ỹ": "y",
    "Ỿ": "Y",
    "ỿ": "y",
    "ↄ": "c",
    "Ⓐ": "A",
    "Ⓑ": "B",
    "Ⓒ": "C",
    "Ⓓ": "D",
    "Ⓔ": "E",
    "Ⓕ": "F",
    "Ⓖ": "G",
    "Ⓗ": "H",
    "Ⓘ": "I",
    "Ⓙ": "J",
    "Ⓚ": "K",
    "Ⓛ": "L",
    "Ⓜ": "M",
    "Ⓝ": "N",
    "Ⓞ": "O",
    "Ⓟ": "P",
    "Ⓠ": "Q",
    "Ⓡ": "R",
    "Ⓢ": "S",
    "Ⓣ": "T",
    "Ⓤ": "U",
    "Ⓥ": "V",
    "Ⓦ": "W",
    "Ⓧ": "X",
    "Ⓨ": "Y",
    "Ⓩ": "Z",
    "ⓐ": "a",
    "ⓑ": "b",
    "ⓒ": "c",
    "ⓓ": "d",
    "ⓔ": "e",
    "ⓕ": "f",
    "ⓖ": "g",
    "ⓗ": "h",
    "ⓘ": "i",
    "ⓙ": "j",
    "ⓚ": "k",
    "ⓛ": "l",
    "ⓜ": "m",
    "ⓝ": "n",
    "ⓞ": "o",
    "ⓟ": "p",
    "ⓠ": "q",
    "ⓡ": "r",
    "ⓢ": "s",
    "ⓣ": "t",
    "ⓤ": "u",
    "ⓥ": "v",
    "ⓦ": "w",
    "ⓧ": "x",
    "ⓨ": "y",
    "ⓩ": "z",
    "Ⱡ": "L",
    "ⱡ": "l",
    "Ɫ": "L",
    "Ᵽ": "P",
    "Ɽ": "R",
    "ⱥ": "a",
    "ⱦ": "t",
    "Ⱨ": "H",
    "ⱨ": "h",
    "Ⱪ": "K",
    "ⱪ": "k",
    "Ⱬ": "Z",
    "ⱬ": "z",
    "Ɱ": "M",
    "Ɐ": "A",
    "Ⱳ": "W",
    "ⱳ": "w",
    "Ⱶ": "H",
    "ⱶ": "h",
    "Ȿ": "S",
    "Ɀ": "Z",
    "Ꜩ": "TZ",
    "ꜩ": "tz",
    "Ꜳ": "AA",
    "ꜳ": "aa",
    "Ꜵ": "AO",
    "ꜵ": "ao",
    "Ꜷ": "AU",
    "ꜷ": "au",
    "Ꜹ": "AV",
    "ꜹ": "av",
    "Ꜻ": "AV",
    "ꜻ": "av",
    "Ꜽ": "AY",
    "ꜽ": "ay",
    "Ꜿ": "C",
    "ꜿ": "c",
    "Ꝁ": "K",
    "ꝁ": "k",
    "Ꝃ": "K",
    "ꝃ": "k",
    "Ꝅ": "K",
    "ꝅ": "k",
    "Ꝇ": "L",
    "ꝇ": "l",
    "Ꝉ": "L",
    "ꝉ": "l",
    "Ꝋ": "O",
    "ꝋ": "o",
    "Ꝍ": "O",
    "ꝍ": "o",
    "Ꝏ": "OO",
    "ꝏ": "oo",
    "Ꝑ": "P",
    "ꝑ": "p",
    "Ꝓ": "P",
    "ꝓ": "p",
    "Ꝕ": "P",
    "ꝕ": "p",
    "Ꝗ": "Q",
    "ꝗ": "q",
    "Ꝙ": "Q",
    "ꝙ": "q",
    "Ꝛ": "R",
    "ꝛ": "r",
    "Ꝟ": "V",
    "ꝟ": "v",
    "Ꝡ": "VY",
    "ꝡ": "vy",
    "Ꝣ": "Z",
    "ꝣ": "z",
    "Ꝺ": "D",
    "ꝺ": "d",
    "Ꝼ": "F",
    "ꝼ": "f",
    "Ᵹ": "G",
    "Ꝿ": "G",
    "ꝿ": "g",
    "Ꞁ": "L",
    "ꞁ": "l",
    "Ꞃ": "R",
    "ꞃ": "r",
    "Ꞅ": "S",
    "ꞅ": "s",
    "Ꞇ": "T",
    "ꞇ": "t",
    "Ɥ": "H",
    "Ꞑ": "N",
    "ꞑ": "n",
    "Ꞡ": "G",
    "ꞡ": "g",
    "Ꞣ": "K",
    "ꞣ": "k",
    "Ꞥ": "N",
    "ꞥ": "n",
    "Ꞧ": "R",
    "ꞧ": "r",
    "Ꞩ": "S",
    "ꞩ": "s",
    "Ａ": "A",
    "Ｂ": "B",
    "Ｃ": "C",
    "Ｄ": "D",
    "Ｅ": "E",
    "Ｆ": "F",
    "Ｇ": "G",
    "Ｈ": "H",
    "Ｉ": "I",
    "Ｊ": "J",
    "Ｋ": "K",
    "Ｌ": "L",
    "Ｍ": "M",
    "Ｎ": "N",
    "Ｏ": "O",
    "Ｐ": "P",
    "Ｑ": "Q",
    "Ｒ": "R",
    "Ｓ": "S",
    "Ｔ": "T",
    "Ｕ": "U",
    "Ｖ": "V",
    "Ｗ": "W",
    "Ｘ": "X",
    "Ｙ": "Y",
    "Ｚ": "Z",
    "ａ": "a",
    "ｂ": "b",
    "ｃ": "c",
    "ｄ": "d",
    "ｅ": "e",
    "ｆ": "f",
    "ｇ": "g",
    "ｈ": "h",
    "ｉ": "i",
    "ｊ": "j",
    "ｋ": "k",
    "ｌ": "l",
    "ｍ": "m",
    "ｎ": "n",
    "ｏ": "o",
    "ｐ": "p",
    "ｑ": "q",
    "ｒ": "r",
    "ｓ": "s",
    "ｔ": "t",
    "ｕ": "u",
    "ｖ": "v",
    "ｗ": "w",
    "ｘ": "x",
    "ｙ": "y",
    "ｚ": "z",

    // Additional maps for russian, ukranian and few other languages
    "Ð": "D",
    "Þ": "TH",
    "ð": "d",
    "þ": "th",
    "Ά": "A",
    "Έ": "E",
    "Ή": "H",
    "Ί": "I",
    "Ό": "O",
    "Ύ": "Y",
    "Ώ": "W",
    "ΐ": "i",
    "Α": "A",
    "Β": "B",
    "Γ": "G",
    "Δ": "D",
    "Ε": "E",
    "Ζ": "Z",
    "Η": "H",
    "Θ": "8",
    "Ι": "I",
    "Κ": "K",
    "Λ": "L",
    "Μ": "M",
    "Ν": "N",
    "Ξ": "3",
    "Ο": "O",
    "Π": "P",
    "Ρ": "R",
    "Σ": "S",
    "Τ": "T",
    "Υ": "Y",
    "Φ": "F",
    "Χ": "X",
    "Ψ": "PS",
    "Ω": "W",
    "Ϊ": "I",
    "Ϋ": "Y",
    "ά": "a",
    "έ": "e",
    "ή": "h",
    "ί": "i",
    "ΰ": "y",
    "α": "a",
    "β": "b",
    "γ": "g",
    "δ": "d",
    "ε": "e",
    "ζ": "z",
    "η": "h",
    "θ": "8",
    "ι": "i",
    "κ": "k",
    "λ": "l",
    "μ": "m",
    "ν": "n",
    "ξ": "3",
    "ο": "o",
    "π": "p",
    "ρ": "r",
    "ς": "s",
    "σ": "s",
    "τ": "t",
    "υ": "y",
    "φ": "f",
    "χ": "x",
    "ψ": "ps",
    "ω": "w",
    "ϊ": "i",
    "ϋ": "y",
    "ό": "o",
    "ύ": "y",
    "ώ": "w",
    "Ё": "Yo",
    "Є": "Ye",
    "І": "I",
    "Ї": "Yi",
    "А": "A",
    "Б": "B",
    "В": "V",
    "Г": "G",
    "Д": "D",
    "Е": "E",
    "Ж": "Zh",
    "З": "Z",
    "И": "I",
    "Й": "J",
    "К": "K",
    "Л": "L",
    "М": "M",
    "Н": "N",
    "О": "O",
    "П": "P",
    "Р": "R",
    "С": "S",
    "Т": "T",
    "У": "U",
    "Ф": "F",
    "Х": "H",
    "Ц": "C",
    "Ч": "Ch",
    "Ш": "Sh",
    "Щ": "Sh",
    "Ъ": "U",
    "Ы": "Y",
    "Ь": "",
    "Э": "E",
    "Ю": "Yu",
    "Я": "Ya",
    "а": "a",
    "б": "b",
    "в": "v",
    "г": "g",
    "д": "d",
    "е": "e",
    "ж": "zh",
    "з": "z",
    "и": "i",
    "й": "j",
    "к": "k",
    "л": "l",
    "м": "m",
    "н": "n",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "у": "u",
    "ф": "f",
    "х": "h",
    "ц": "c",
    "ч": "ch",
    "ш": "sh",
    "щ": "sh",
    "ъ": "u",
    "ы": "y",
    "ь": "",
    "э": "e",
    "ю": "yu",
    "я": "ya",
    "ё": "yo",
    "є": "ye",
    "і": "i",
    "ї": "yi",
    "Ґ": "G",
    "ґ": "g"
  };

  /**
   * Removes the diacritics from `character`.
   *
   * @ignore
   * @param {string} character The character with diacritics.
   * @returns {string} Returns the character without diacritics.
   */
  function removeDiacritics(character) {
    var characterWithoutDiacritic = diacriticMap[character];
    return characterWithoutDiacritic ? characterWithoutDiacritic : character;
  }

  /**
   * Returns the `cleanCharacter` from combining marks regular expression match.
   * @ignore
   * @param {string} character The character with combining marks
   * @param {string} cleanCharacter The character without combining marks.
   * @return {string} The character without combining marks.
   */
  function removeCombiningMarks(character, cleanCharacter) {
    return cleanCharacter;
  }

  /**
   * Latinises the `subject` by removing diacritic characters.
   *
   * @function latinise
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to latinise.
   * @return {string} Returns the latinised string.
   * @example
   * v.latinise('cafe\u0301'); // or 'café'
   * // => 'cafe'
   *
   * v.latinise('août décembre');
   * // => 'aout decembre'
   *
   * v.latinise('как прекрасен этот мир');
   * // => 'kak prekrasen etot mir'
   */
  function latinise (subject) {
    var subjectString = coerceToString(subject);
    if (subjectString === '') {
      return subjectString;
    }
    return subjectString.replace(REGEXP_NON_BASIC_LATIN, removeDiacritics).replace(REGEXP_COMBINING_MARKS, removeCombiningMarks);
  }

  /**
   * Pads `subject` to a new `length`.
   *
   * @function pad
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to pad.
   * @param {int} [length=0] The length to pad the string. No changes are made if `length` is less than `subject.length`.
   * @param {string} [pad=' '] The string to be used for padding.
   * @return {string} Returns the padded string.
   * @example
   * v.pad('word', 6, '-');
   * // => '-word-'
   *
   * v.pad('hi', 5, '-=');
   * // => '-hi-='
   */
  function pad (subject, length, pad) {
    var subjectString = coerceToString(subject),
        lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
        padString = coerceToString(pad, ' ');
    if (lengthInt <= subjectString.length) {
      return subjectString;
    }
    var paddingLength = lengthInt - subjectString.length,
        paddingSideLength = toInteger(paddingLength / 2),
        paddingSideRemainingLength = paddingLength % 2;
    return buildPadding(padString, paddingSideLength) + subjectString + buildPadding(padString, paddingSideLength + paddingSideRemainingLength);
  }

  /**
   * Returns a new string where the matches of `pattern` are replaced with `replacement`. <br/>
   *
   * @function replace
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to verify.
   * @param {string|RegExp} pattern The pattern which match is replaced. If `pattern` is a string,
   * a simple string match is evaluated and only the first occurrence replaced.
   * @param {string|Function} replacement The string or function which invocation result replaces `pattern` match.
   * @return {string} Returns the replacement result.
   * @example
   * v.replace('swan', 'wa', 'u');
   * // => 'sun'
   *
   * v.replace('domestic duck', /domestic\s/, '');
   * // => 'duck'
   *
   * v.replace('nice duck', /(nice)(duck)/, function(match, nice, duck) {
   *   return 'the ' + duck + ' is ' + nice;
   * });
   * // => 'the duck is nice'
   */
  function replace (subject, pattern, replacement) {
    var subjectString = coerceToString(subject);
    return subjectString.replace(pattern, replacement);
  }

  /**
   * Get the flags string from a regular expression object.
   *
   * @ignore
   * @param {RegExp} regExp The regular expression object.
   * @return {string} Returns the string with flags chars.
   */
  function getRegularExpressionFlags (regExp) {
    return regExp.toString().match(REGEXP_FLAGS)[0];
  }

  /**
   * Checks if `subject` includes `search` starting from `position`
   *
   * @function includes
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string where to search.
   * @param {string} search The string to search.
   * @param {number} [position=0] The position to start searching.
   * @return {boolean} Returns `true` if `subject` includes `search` or `false` otherwise.
   * @example
   * v.includes('starship', 'star');
   * // => true
   *
   * v.includes('galaxy', 'g', 1);
   * // => false
   */
  function includes (subject, search, position) {
    var subjectString = coerceToString(subject),
        searchString = toString(search);
    if (searchString === null) {
      return false;
    }
    if (searchString === '') {
      return true;
    }
    position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
    return subjectString.indexOf(searchString, position) !== -1;
  }

  /**
   * Append flag to a regular expression.
   *
   * @ignore
   * @param {RegExp} pattern The pattern to coerce.
   * @param {string} appendFlag The flag to append to regular expression.
   * @return {RegExp} The regular expression with added flag.
   */
  function appendFlagToRegularExpression (pattern, appendFlag) {
    var regularExpressionFlags = getRegularExpressionFlags(pattern);
    if (!includes(regularExpressionFlags, appendFlag)) {
      return new RegExp(pattern.source, regularExpressionFlags + appendFlag);
    }
    return pattern;
  }

  /**
   * Returns a new string where all matches of `pattern` are replaced with `replacement`. <br/>
   *
   * @function replaceAll
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to verify.
   * @param {string|RegExp} pattern The pattern which match is replaced. If `pattern` is a string, a simple string match is evaluated.
   * All matches are replaced.
   * @param {string|Function} replacement The string or function which invocation result replaces `pattern` match.
   * @return {string} Returns the replacement result.
   * @example
   * v.replaceAll('good morning', 'o', '*');
   * // => 'g**d m*rning'
   * v.replaceAll('evening', \n\, 's');
   * // => 'evesisg'
   *
   */
  function replaceAll (subject, pattern, replacement) {
    var subjectString = coerceToString(subject),
        regExp = pattern;
    if (!(pattern instanceof RegExp)) {
      regExp = new RegExp(escapeRegExp(pattern), 'g');
    } else if (!pattern.global) {
      regExp = appendFlagToRegularExpression(pattern, 'g');
    }
    return subjectString.replace(regExp, replacement);
  }

  /**
   * Reverses the `subject`.
   *
   * @function reverse
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to reverse.
   * @return {string} Returns the reversed string.
   * @example
   * v.reverse('winter');
   * // => 'retniw'
   */
  function reverse (subject) {
    var subjectString = coerceToString(subject);
    return subjectString.split('').reverse().join('');
  }

  /**
   * Reverses the `subject` taking care of
   * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
   * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
   *
   * @function reverseGrapheme
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to reverse.
   * @return {string} Returns the reversed string.
   * @example
   * v.reverseGrapheme('summer');
   * // => 'remmus'
   *
   * v.reverseGrapheme('𝌆 bar mañana mañana');
   * // => 'anañam anañam rab 𝌆'
   */
  function reverseCodePoint(subject) {
    var subjectString = coerceToString(subject);
    /**
     * @see https://github.com/mathiasbynens/esrever
     */
    subjectString = subjectString.replace(REGEXP_COMBINING_MARKS, function ($0, $1, $2) {
      return reverseCodePoint($2) + $1;
    }).replace(REGEXP_SURROGATE_PAIRS, '$2$1');
    var reversedString = '',
        index = subjectString.length;
    while (index--) {
      reversedString += subjectString.charAt(index);
    }
    return reversedString;
  }

  /**
   * Slugify the `subject`. Cleans the `subject` by replacing diacritics with corresponding latin characters.
   *
   * @function slugify
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to slugify.
   * @return {string} The slugified string.
   * @example
   * v.slugify('Italian cappuccino drink');
   * // => 'italian-cappuccino-drink'
   *
   * v.slugify('café latté');
   * // => 'caffe-latte'
   *
   * v.slugify('хорошая погода');
   * // => 'horoshaya-pogoda'
   */
  function slugify (subject) {
    var subjectString = coerceToString(subject);
    if (subjectString === '') {
      return '';
    }
    var cleanSubjectString = latinise(subjectString).replace(REGEXP_NON_LATIN, '-');
    return kebabCase(cleanSubjectString);
  }

  /**
   * Removes the whitespaces from the left part of the `subject`.
   *
   * @function trimLeft
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to trim.
   * @param {string} [whitespace=whitespace] The whitespace characters to trim.
   * @return {string} Returns the trimmed string.
   * @example
   * v.trimLeft('  Starship Troopers');
   * // => 'Starship Troopers'
   *
   * v.trimLeft('***Mobile Infantry', '*');
   * // => 'Mobile Infantry'
   */
  function trimLeft (subject, whitespace) {
    var subjectString = coerceToString(subject);
    if (whitespace === '' || subjectString === '') {
      return subjectString;
    }
    var whitespaceString = toString(whitespace);
    if (isNil(whitespaceString)) {
      return subjectString.replace(REGEX_TRIM_LEFT, '');
    }
    var matchWhitespace = true,
        totalWhitespaceLength = 0,
        whitespaceStringLength = whitespaceString.length;
    while (matchWhitespace) {
      if (subjectString.indexOf(whitespaceString, totalWhitespaceLength) === totalWhitespaceLength) {
        totalWhitespaceLength += whitespaceStringLength;
      } else {
        matchWhitespace = false;
      }
    }
    return subjectString.substring(totalWhitespaceLength);
  }

  /**
   * Removes the whitespaces from the right part of the `subject`.
   *
   * @function trimRight
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to trim.
   * @param {string} [whitespace=whitespace] The whitespace characters to trim.
   * @return {string} Returns the trimmed string.
   * @example
   * v.trimRight('the fire rises   ');
   * // => 'the fire rises'
   *
   * v.trimRight('do you feel in charge?---', '-');
   * // => 'do you feel in charge?'
   */
  function trimRight (subject, whitespace) {
    var subjectString = coerceToString(subject);
    if (whitespace === '' || subjectString === '') {
      return subjectString;
    }
    var whitespaceString = toString(whitespace);
    if (isNil(whitespaceString)) {
      return subjectString.replace(REGEX_TRIM_RIGHT, '');
    }
    var matchWhitespace = true,
        totalWhitespaceLength = 0,
        whitespaceStringLength = whitespaceString.length,
        valueStringLength = subjectString.length,
        position;
    while (matchWhitespace) {
      position = valueStringLength - totalWhitespaceLength - whitespaceStringLength;
      if (subjectString.indexOf(whitespaceString, position) === position) {
        totalWhitespaceLength += whitespaceStringLength;
      } else {
        matchWhitespace = false;
      }
    }
    return subjectString.substring(0, valueStringLength - totalWhitespaceLength);
  }

  /**
   * Removes the whitespaces from left and right parts of the `subject`.
   *
   * @function trim
   * @static
   * @since 1.0.0
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to trim.
   * @param {string} [whitespace=whitespace] The whitespace characters to trim.
   * @return {string} Returns the trimmed string.
   * @example
   * v.trim(' Mother nature ');
   * // => 'Mother nature'
   *
   * v.trim('--Earth--', '-');
   * // => 'Earth'
   */
  function trim (subject, whitespace) {
    var subjectString = coerceToString(subject);
    if (whitespace === '' || subjectString === '') {
      return subjectString;
    }
    var whitespaceString = toString(whitespace);
    if (isNil(whitespaceString)) {
      return subjectString.trim();
    }
    return trimRight(trimLeft(subjectString, whitespaceString), whitespaceString);
  }

  /**
   * Checks if `subject` ends with `end`.
   *
   * @function endsWith
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @param {string} end The ending string.
   * @param {number} [position=subject.length] Search within `subject` as if the string were only `position` long.
   * @return {boolean} Returns `true` if `subject` ends with `end` or `false` otherwise.
   * @example
   * v.endsWith('red alert', 'alert');
   * // => true
   *
   * v.endsWith('metro south', 'metro');
   * // => false
   *
   * v.endsWith('Murphy', 'ph', 5);
   * // => true
   */
  function endsWith (subject, end, position) {
    if (isNil(end)) {
      return false;
    }
    var subjectString = coerceToString(subject),
        endString = coerceToString(end);
    if (endString === '') {
      return true;
    }
    position = isNil(position) ? subjectString.length : clipNumber(toInteger(position), 0, subjectString.length);
    position -= endString.length;
    var lastIndex = subjectString.indexOf(endString, position);
    return lastIndex !== -1 && lastIndex === position;
  }

  /**
   * Checks if `subject` contains only alpha characters.
   *
   * @function isAlpha
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @return {boolean} Returns `true` if `subject` contains only alpha characters or `false` otherwise.
   * @example
   * v.isAlpha('bart');
   * // => true
   *
   * v.isAlpha('lisa!');
   * // => false
   *
   * v.isAlpha('lisa and bart');
   * // => false
   */
  function isAlpha (subject) {
    var subjectString = coerceToString(subject);
    return REGEXP_ALPHA.test(subjectString);
  }

  /**
   * Checks if `subject` contains only alpha and digit characters.
   *
   * @function isAlphaDigit
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @return {boolean} Returns `true` if `subject` contains only alpha and digit characters or `false` otherwise.
   * @example
   * v.isAlphaDigit('year2020');
   * // => true
   *
   * v.isAlphaDigit('1448');
   * // => true
   *
   * v.isAlphaDigit('40-20');
   * // => false
   */
  function isAlphaDigit (subject) {
    var subjectString = coerceToString(subject);
    return REGEXP_ALPHA_DIGIT.test(subjectString);
  }

  /**
   * Checks if `subject` is empty or contains only whitespaces.
   *
   * @function isBlank
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @return {boolean} Returns `true` if `subject` is empty or contains only whitespaces or `false` otherwise.
   * @example
   * v.isBlank('');
   * // => true
   *
   * v.isBlank('  ');
   * // => true
   *
   * v.isBlank('World');
   * // => false
   */
  function isBlank (subject) {
    var subjectString = coerceToString(subject);
    return subjectString.trim().length === 0;
  }

  /**
   * Checks if `subject` contains only digit characters.
   *
   * @function isDigit
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @return {boolean} Returns `true` if `subject` contains only digit characters or `false` otherwise.
   * @example
   * v.isDigit('35');
   * // => true
   *
   * v.isDigit('1.5');
   * // => false
   *
   * v.isDigit('ten');
   * // => false
   */
  function isDigit (subject) {
    var subjectString = coerceToString(subject);
    return REGEXP_DIGIT.test(subjectString);
  }

  /**
   * Checks if `subject` is empty.
   *
   * @function isEmpty
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @return {boolean} Returns `true` if `subject` is empty or `false` otherwise
   * @example
   * v.isEmpty('');
   * // => true
   *
   * v.isEmpty('  ');
   * // => false
   */
  function isEmpty (subject) {
    var subjectString = coerceToString(subject);
    return subjectString.length === 0;
  }

  /**
   * Checks if `subject` has only lower case characters.
   *
   * @function isLowerCase
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @return {boolean} Returns `true` if `subject` is lower case or `false` otherwise.
   * @example
   * v.isLowerCase('motorcycle');
   * // => true
   *
   * v.isLowerCase('John');
   * // => false
   *
   * v.isLowerCase('T1000');
   * // => false
   */
  function isLowerCase (subject) {
    var valueString = coerceToString(subject);
    return isAlpha(valueString) && valueString.toLowerCase() === valueString;
  }

  /**
   * Checks if `subject` is numeric.
   *
   * @function isNumeric
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @return {boolean} Returns `true` if `subject` is numeric or `false` otherwise.
   * @example
   * v.isNumeric('350');
   * // => true
   *
   * v.isNumeric('-20.5');
   * // => true
   *
   * v.isNumeric('NaN');
   * // => false
   */
  function isNumeric (subject) {
    var valueNumeric = (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && !isNil(subject) ? Number(subject) : subject;
    return (typeof valueNumeric === 'number' || typeof valueNumeric === 'string') && !isNaN(valueNumeric - parseFloat(valueNumeric));
  }

  /**
   * Checks if `subject` has only upper case characters.
   *
   * @function isUpperCase
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @return {boolean} Returns `true` if `subject` is upper case or `false` otherwise.
   * @example
   * v.isUpperCase('ACDC');
   * // => true
   *
   * v.isUpperCase('Morning');
   * // => false
   */
  function isUpperCase (subject) {
    var subjectString = coerceToString(subject);
    return isAlpha(subjectString) && subjectString.toUpperCase() === subjectString;
  }

  /**
   * Checks if `subject` matches the regular expression `pattern`.
   *
   * @function matches
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @param {RegExp|string} pattern The pattern to match. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
   * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
   * @return {boolean} Returns `true` if `subject` matches `pattern` or `false` otherwise.
   * @example
   * v.matches('pluto', /plu.{2}/);
   * // => true
   *
   * v.matches('sun', 'S', 'i');
   * // => true
   *
   * v.matches('apollo 11', '\\d{3}');
   * // => false
   */
  function matches (subject, pattern, flags) {
    var subjectString = coerceToString(subject),
        flagsString = coerceToString(flags),
        patternString;
    if (!(pattern instanceof RegExp)) {
      patternString = toString(pattern);
      if (patternString === null) {
        return false;
      }
      pattern = new RegExp(patternString, flagsString);
    }
    return pattern.test(subjectString);
  }

  /**
   * Checks if `subject` starts with `start`.
   *
   * @function startsWith
   * @static
   * @since 1.0.0
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @param {string} start The starting string.
   * @param {number} [position=0] The position to start searching.
   * @return {boolean} Returns `true` if `subject` starts with `start` or `false` otherwise.
   * @example
   * v.startsWith('say hello to my little friend', 'say hello');
   * // => true
   *
   * v.startsWith('tony', 'on', 1);
   * // => true
   *
   * v.startsWith('the world is yours', 'world');
   * // => false
   */
  function startsWith (subject, start, position) {
    var subjectString = coerceToString(subject),
        startString = toString(start);
    if (startString === null) {
      return false;
    }
    if (startString === '') {
      return true;
    }
    position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
    return subjectString.substr(position, startString.length) === startString;
  }

  /**
   * Splits `subject` into an array of characters.
   *
   * @function chars
   * @static
   * @since 1.0.0
   * @memberOf Split
   * @param {string} [subject=''] The string to split into characters.
   * @return {Array} Returns the array of characters.
   * @example
   * v.chars('cloud');
   * // => ['c', 'l', 'o', 'u', 'd']
   */
  function chars (subject) {
    var subjectString = coerceToString(subject);
    return subjectString.split('');
  }

  /**
   * Splits `subject` into an array of graphemes taking care of
   * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
   * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
   *
   * @function graphemes
   * @static
   * @since 1.0.0
   * @memberOf Split
   * @param {string} [subject=''] The string to split into characters.
   * @return {Array} Returns the array of graphemes.
   * @example
   * v.graphemes('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
   * // => ['\uD835\uDC00', '\uD835\uDC01']
   *
   * v.graphemes('cafe\u0301'); // or 'café'
   * // => ['c', 'a', 'f', 'e\u0301']
   */
  function graphemes (subject) {
    var subjectString = coerceToString(subject);
    return nilDefault(subjectString.match(REGEXP_UNICODE_CHARACTER), []);
  }

  /**
   * Splits `subject` into an array of chunks by `separator`.
   *
   * @function split
   * @static
   * @since 1.0.0
   * @memberOf Split
   * @param {string} [subject=''] The string to split into characters.
   * @param {string|RegExp} [separator] The pattern to match the separator.
   * @param {number} [limit] Limit the number of chunks to be found.
   * @return {Array} Returns the array of chunks.
   * @example
   * v.split('rage against the dying of the light', ' ');
   * // => ['rage', 'against', 'the', 'dying', 'of', 'the', 'light']
   *
   * v.split('the dying of the light', /\s/, 3);
   * // => ['the', 'dying', 'of']
   */
  function split (subject, separator, limit) {
    var subjectString = coerceToString(subject);
    return subjectString.split(separator, limit);
  }

  var globalObject$1 = null;

  function getGlobalObject() {
    if (globalObject$1 !== null) {
      return globalObject$1;
    }
    /* istanbul ignore next */
    // It's hard to mock the global variables. This code surely works fine. I hope :)
    if ((typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global.Object === Object) {
      // NodeJS global object
      globalObject$1 = global;
    } else if ((typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.Object === Object) {
      // self property from Window object
      globalObject$1 = self;
    } else {
      // Other cases. Function constructor always has the context as global object
      globalObject$1 = new Function('return this')();
    }
    return globalObject$1;
  }

  var globalObject = getGlobalObject();
  var previousV = globalObject.v;

  /**
   * Restores `v` variable to previous value and returns Voca library instance.
   *
   * @function noConflict
   * @static
   * @since 1.0.0
   * @memberOf Util
   * @return {Object} Returns Voca library instance.
   * @example
   * var voca = v.noConflict();
   * voca.isAlhpa('Hello');
   * // => true
   */
  function noConflict () {
    if (this === globalObject.v) {
      globalObject.v = previousV;
    }
    return this;
  }

  /**
   * A property that contains the library <a href="http://semver.org/">semantic version number</a>.
   * @name version
   * @static
   * @since 1.0.0
   * @memberOf Util
   * @type string
   * @example
   * v.version
   * // => '1.0.0'
   */
  var version = '0.0.1';

  var functions = {
    camelCase: camelCase,
    capitalize: capitalize,
    decapitalize: decapitalize,
    kebabCase: kebabCase,
    lowerCase: lowerCase,
    snakeCase: snakeCase,
    upperCase: upperCase,

    count: count,
    countGrapheme: countGrapheme,
    countSubstring: countSubstring,
    countWhere: countWhere,

    escapeHtml: escapeHtml,
    escapeRegExp: escapeRegExp,
    unescapeHtml: unescapeHtml,

    sprintf: sprintf,
    vprintf: vprintf,

    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    search: search,

    charAt: charAt,
    codePointAt: codePointAt,
    first: first,
    graphemeAt: graphemeAt,
    last: last,
    prune: prune,
    slice: slice,
    substr: substr,
    substring: substring,
    truncate: truncate,

    latinise: latinise,
    pad: pad,
    padLeft: padLeft,
    padRight: padRight,
    repeat: repeat,
    replace: replace,
    replaceAll: replaceAll,
    reverse: reverse,
    reverseGrapheme: reverseCodePoint,
    slugify: slugify,
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
    graphemes: graphemes,
    split: split,
    words: words,

    noConflict: noConflict,
    version: version
  };

  /**
   * Chain wrapper class.
   * @ignore
   */

  var ChainWrapper = function () {
    /**
     * The chain wrapper constructor.
     *
     * @ignore
     * @param  {string}       subject               The string to be wrapped.
     * @param  {boolean}      [explicitChain=false] A boolean that indicates if the chain sequence is explicit or implicit.
     * @return {ChainWrapper}                       Returns a new instance of `ChainWrapper`
     * @constructor
     */
    function ChainWrapper(subject, explicitChain) {
      classCallCheck(this, ChainWrapper);

      this._wrappedValue = subject;
      this._explicitChain = explicitChain;
    }

    /**
     * Unwraps the chain sequence value.
     *
     * @memberof Chain
     * @since 1.0.0
     * @function __proto__value
     * @return {*} Returns the unwrapped value.
     * @example
     * v
     *  .chain('Hello world')
     *  .replace('Hello', 'Hi')
     *  .lowerCase()
     *  .slugify()
     *  .value()
     * // => 'hi-world'
     *
     * v(' Space travel ')
     *  .trim()
     *  .truncate(8)
     *  .value()
     * // => 'Space...'
     */


    createClass(ChainWrapper, [{
      key: 'value',
      value: function value() {
        return this._wrappedValue;
      }

      /**
       * Override the default object valueOf().
       *
       * @ignore
       * @return {*} Returns the wrapped value.
       */

    }, {
      key: 'valueOf',
      value: function valueOf() {
        return this.value();
      }

      /**
       * Returns the wrapped value to be used in JSON.stringify().
       *
       * @ignore
       * @return {*} Returns the wrapped value.
       */

    }, {
      key: 'toJSON',
      value: function toJSON() {
        return this.value();
      }

      /**
       * Returns the string representation of the wrapped value.
       *
       * @ignore
       * @return {string} Returns the string representation.
       */

    }, {
      key: 'toString',
      value: function toString() {
        return String(this.value());
      }

      /**
       * Creates a new chain object that enables <i>explicit</i> chain sequences.
       * Use `v.prototype.value()` to unwrap the result. <br/>
       * Does not modify the wrapped value.
       *
       * @memberof Chain
       * @since 1.0.0
       * @function __proto__chain
       * @return {Object} Returns the new wrapper object.
       * @example
       * v('Back to School')
       *  .chain()
       *  .lowerCase()
       *  .words()
       *  .value()
       * // => ['back', 'to', 'school']
       *
       * v(" Back to School ")
       *  .chain()
       *  .trim()
       *  .truncate(7)
       *  .value()
       * // => 'Back...'
       */

    }, {
      key: 'chain',
      value: function chain() {
        return new ChainWrapper(this._wrappedValue, true);
      }

      /**
       * Modifies the wrapped value with the invocation result of `changer` function.
       *
       * @memberof Chain
       * @since 1.0.0
       * @function __proto__thru
       * @param  {Function} changer The function to invoke.
       * @return {Object}           Returns the new wrapper object.
       * @example
       * v('sun is shining')
       *  .words()
       *  .thru(function(words) {
       *    return words[0];
       *  })
       *  .value()
       * // => 'sun'
       *
       */

    }, {
      key: 'thru',
      value: function thru(changer) {
        if (typeof changer === 'function') {
          return new ChainWrapper(changer(this._wrappedValue), this._explicitChain);
        }
        return this;
      }
    }]);
    return ChainWrapper;
  }();

  /**
   * A boolean that indicates if the chain sequence is explicit or implicit.
   * @ignore
   * @type {boolean}
   * @private
   */


  ChainWrapper.prototype._explicitChain = true;

  /**
   * Make a voca function chainable.
   *
   * @ignore
   * @param  {Function} functionInstance The function to make chainable
   * @return {Function}                  Returns the chainable function
   */
  function makeFunctionChainable(functionInstance) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = functionInstance.apply(undefined, [this._wrappedValue].concat(args));
      if (this._explicitChain || typeof result === 'string') {
        return new ChainWrapper(result, this._explicitChain);
      } else {
        return result;
      }
    };
  }

  Object.keys(functions).forEach(function (name) {
    ChainWrapper.prototype[name] = makeFunctionChainable(functions[name]);
  });

  /**
   * Creates a chain object that wraps `subject`, enabling <i>explicit</i> chain sequences. <br/>
   * Use `v.prototype.value()` to unwrap the result.
   *
   * @memberOf Chain
   * @since 1.0.0
   * @function chain
   * @param  {string} subject The string to wrap.
   * @return {Object}         Returns the new wrapper object.
   * @example
   * v
   *  .chain('Back to School')
   *  .lowerCase()
   *  .words()
   *  .value()
   * // => ['back', 'to', 'school']
   */
  function chain (subject) {
    return new ChainWrapper(subject, true);
  }

  /**
   * Creates a chain object that wraps `subject`, enabling <i>implicit</i> chain sequences.<br/>
   * A function that returns `number`, `boolean` or `array` type <i>terminates</i> the chain sequence and returns the unwrapped value.
   * Otherwise use `v.prototype.value()` to unwrap the result.
   *
   * @memberOf Chain
   * @since 1.0.0
   * @function v
   * @param {string} subject The string to wrap.
   * @return {Object}  Returns the new wrapper object.
   * @example
   * v('Back to School')
   *  .lowerCase()
   *  .words()
   * // => ['back', 'to', 'school']
   *
   * v(" Back to School ")
   *  .trim()
   *  .truncate(7)
   *  .value()
   * // => 'Back...'
   */
  function Voca(subject) {
    return new ChainWrapper(subject, false);
  }

  _extends(Voca, functions, {
    chain: chain
  });

  return Voca;

}));