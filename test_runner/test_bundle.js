(function (chai) {
  'use strict';

  /**
   * The string containing all printable ASCII characters.
   * @ignore
   * @type {string}
   */
  var PRINTABLE_ASCII = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

  /**
   * The string containing all printable ASCII characters in reverse order.
   * @ignore
   * @type {string}
   */
  var REVERSED_PRINTABLE_ASCII = '~}|{zyxwvutsrqponmlkjihgfedcba`_^]\\[ZYXWVUTSRQPONMLKJIHGFEDCBA@?>=<;:9876543210/.-,+*)(\'&%$#"! ';

  /**
   * Regular expression to match the library version.
   * @see http://semver.org/
   * @type {RegExp}
   */
  var REGEXP_SEMVER = /\bv?(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/ig;

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

  describe('camelCase', function () {

    it('should return the camel case of a string', function () {
      chai.expect(Voca.camelCase('bird')).to.be.equal('bird');
      chai.expect(Voca.camelCase('BIRD')).to.be.equal('bird');
      chai.expect(Voca.camelCase('BirdFlight')).to.be.equal('birdFlight');
      chai.expect(Voca.camelCase('bird flight')).to.be.equal('birdFlight');
      chai.expect(Voca.camelCase('San Diego Zoo Safari Park')).to.be.equal('sanDiegoZooSafariPark');
      chai.expect(Voca.camelCase('-BIRD-FLIGHT-')).to.be.equal('birdFlight');
      chai.expect(Voca.camelCase('__BIRD___FLIGHT___')).to.be.equal('birdFlight');
      chai.expect(Voca.camelCase('Restless flycatcher')).to.be.equal('restlessFlycatcher');
      chai.expect(Voca.camelCase('XMLHttpRequest')).to.be.equal('xmlHttpRequest');
      chai.expect(Voca.camelCase('weight of up to 12 kg')).to.be.equal('weightOfUpTo12Kg');
      chai.expect(Voca.camelCase('/home/dmitri/projects/voca')).to.be.equal('homeDmitriProjectsVoca');
      chai.expect(Voca.camelCase(PRINTABLE_ASCII)).to.be.equal('0123456789AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz');
      chai.expect(Voca.camelCase('****')).to.be.equal('');
      chai.expect(Voca.camelCase('****')).to.be.equal('');
      chai.expect(Voca.camelCase('-----')).to.be.equal('');
      chai.expect(Voca.camelCase('     ')).to.be.equal('');
      chai.expect(Voca.camelCase('\n\n\n\n   ***\t\t')).to.be.equal('');
      chai.expect(Voca.camelCase('')).to.be.equal('');
    });

    it('should return the camel case of a non-latin string', function () {
      chai.expect(Voca.camelCase('zborul păsării')).to.be.equal('zborulPăsării');
      chai.expect(Voca.camelCase('полет птицы')).to.be.equal('полетПтицы');
      chai.expect(Voca.camelCase('fuerza de sustentación')).to.be.equal('fuerzaDeSustentación');
      chai.expect(Voca.camelCase('skrzydło ptaka składa się')).to.be.equal('skrzydłoPtakaSkładaSię');
    });

    it('should not modify numbers', function () {
      chai.expect(Voca.camelCase(0)).to.be.equal('0');
      chai.expect(Voca.camelCase(1200)).to.be.equal('1200');
      chai.expect(Voca.camelCase('8965')).to.be.equal('8965');
    });

    it('should return the camel case of a string representation of an object', function () {
      chai.expect(Voca.camelCase(['bird flight'])).to.be.equal('birdFlight');
      chai.expect(Voca.camelCase({
        toString: function toString() {
          return 'bird flight';
        }
      })).to.be.equal('birdFlight');
    });

    it('should return empty string for null or undefined', function () {
      chai.expect(Voca.camelCase()).to.be.equal('');
      chai.expect(Voca.camelCase(undefined)).to.be.equal('');
      chai.expect(Voca.camelCase(null)).to.be.equal('');
    });
  });

  describe('capitalize', function () {

    it('should capitalize the first character in a string', function () {
      chai.expect(Voca.capitalize('APPLE')).to.be.equal('APPLE');
      chai.expect(Voca.capitalize('apple')).to.be.equal('Apple');
      chai.expect(Voca.capitalize('macBook')).to.be.equal('MacBook');
      chai.expect(Voca.capitalize('f')).to.be.equal('F');
      chai.expect(Voca.capitalize('')).to.be.equal('');
      chai.expect(Voca.capitalize('*apple')).to.be.equal('*apple');
      chai.expect(Voca.capitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    });

    it('should capitalize the first character in a string and keep the rest unmodified', function () {
      chai.expect(Voca.capitalize('apple', true)).to.be.equal('Apple');
      chai.expect(Voca.capitalize('APPLE', true)).to.be.equal('Apple');
      chai.expect(Voca.capitalize('яблоко', true)).to.be.equal('Яблоко');
      chai.expect(Voca.capitalize('f', true)).to.be.equal('F');
      chai.expect(Voca.capitalize('', true)).to.be.equal('');
      chai.expect(Voca.capitalize('100', true)).to.be.equal('100');
      chai.expect(Voca.capitalize('  ', true)).to.be.equal('  ');
    });

    it('should capitalize the first character in a string representation of an object', function () {
      chai.expect(Voca.capitalize(['grape'])).to.be.equal('Grape');
      chai.expect(Voca.capitalize({
        toString: function toString() {
          return 'oRaNgE';
        }
      }, false)).to.be.equal('ORaNgE');
    });

    it('should not modify numbers', function () {
      chai.expect(Voca.capitalize(100)).to.be.equal('100');
      chai.expect(Voca.capitalize(812, false)).to.be.equal('812');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.capitalize()).to.be.equal('');
      chai.expect(Voca.capitalize(undefined)).to.be.equal('');
      chai.expect(Voca.capitalize(null)).to.be.equal('');
      chai.expect(Voca.capitalize(undefined, true)).to.be.equal('');
      chai.expect(Voca.capitalize(undefined, false)).to.be.equal('');
    });
  });

  describe('decapitalize', function () {

    it('should decapitalize the first character in a string', function () {
      chai.expect(Voca.decapitalize('Light')).to.be.equal('light');
      chai.expect(Voca.decapitalize('light')).to.be.equal('light');
      chai.expect(Voca.decapitalize('Sun')).to.be.equal('sun');
      chai.expect(Voca.decapitalize('f')).to.be.equal('f');
      chai.expect(Voca.decapitalize('')).to.be.equal('');
      chai.expect(Voca.decapitalize('*light')).to.be.equal('*light');
      chai.expect(Voca.decapitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    });

    it('should decapitalize the first character in a string representation of an object', function () {
      chai.expect(Voca.decapitalize(['Fruit'])).to.be.equal('fruit');
      chai.expect(Voca.decapitalize({
        toString: function toString() {
          return 'CaRrOt';
        }
      }, false)).to.be.equal('caRrOt');
    });

    it('should not modify numbers', function () {
      chai.expect(Voca.decapitalize(100)).to.be.equal('100');
      chai.expect(Voca.decapitalize(812, false)).to.be.equal('812');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.decapitalize()).to.be.equal('');
      chai.expect(Voca.decapitalize(undefined)).to.be.equal('');
      chai.expect(Voca.decapitalize(null)).to.be.equal('');
    });
  });

  describe('kebabCase', function () {

    it('should return the kebab case of a string', function () {
      chai.expect(Voca.kebabCase('bird')).to.be.equal('bird');
      chai.expect(Voca.kebabCase('BIRD')).to.be.equal('bird');
      chai.expect(Voca.kebabCase('BirdFlight')).to.be.equal('bird-flight');
      chai.expect(Voca.kebabCase('bird flight')).to.be.equal('bird-flight');
      chai.expect(Voca.kebabCase('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
      chai.expect(Voca.kebabCase('-BIRD-FLIGHT-')).to.be.equal('bird-flight');
      chai.expect(Voca.kebabCase('__BIRD___FLIGHT___')).to.be.equal('bird-flight');
      chai.expect(Voca.kebabCase('Restless flycatcher')).to.be.equal('restless-flycatcher');
      chai.expect(Voca.kebabCase('XMLHttpRequest')).to.be.equal('xml-http-request');
      chai.expect(Voca.kebabCase('weight of up to 12 kg')).to.be.equal('weight-of-up-to-12-kg');
      chai.expect(Voca.kebabCase('/home/dmitri/projects/voca')).to.be.equal('home-dmitri-projects-voca');
      chai.expect(Voca.kebabCase(PRINTABLE_ASCII)).to.be.equal('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
      chai.expect(Voca.kebabCase('****')).to.be.equal('');
      chai.expect(Voca.kebabCase('****')).to.be.equal('');
      chai.expect(Voca.kebabCase('-----')).to.be.equal('');
      chai.expect(Voca.kebabCase('     ')).to.be.equal('');
      chai.expect(Voca.kebabCase('\n\n\n\n   ***\t\t')).to.be.equal('');
      chai.expect(Voca.kebabCase('')).to.be.equal('');
    });

    it('should return the kebab case of a non-latin string', function () {
      chai.expect(Voca.kebabCase('zborul păsării')).to.be.equal('zborul-păsării');
      chai.expect(Voca.kebabCase('полет птицы')).to.be.equal('полет-птицы');
      chai.expect(Voca.kebabCase('fuerza de sustentación')).to.be.equal('fuerza-de-sustentación');
      chai.expect(Voca.kebabCase('skrzydło ptaka składa się')).to.be.equal('skrzydło-ptaka-składa-się');
    });

    it('should not modify numbers', function () {
      chai.expect(Voca.kebabCase(0)).to.be.equal('0');
      chai.expect(Voca.kebabCase(1200)).to.be.equal('1200');
      chai.expect(Voca.kebabCase('8965')).to.be.equal('8965');
    });

    it('should return the kebab case of a string representation of an object', function () {
      chai.expect(Voca.kebabCase(['bird flight'])).to.be.equal('bird-flight');
      chai.expect(Voca.kebabCase({
        toString: function toString() {
          return 'bird flight';
        }
      })).to.be.equal('bird-flight');
    });

    it('should return empty string for null or undefined', function () {
      chai.expect(Voca.kebabCase()).to.be.equal('');
      chai.expect(Voca.kebabCase(undefined)).to.be.equal('');
      chai.expect(Voca.kebabCase(null)).to.be.equal('');
    });
  });

  describe('lowerCase', function () {

    it('should return the lower case of a string', function () {
      chai.expect(Voca.lowerCase('Saturn')).to.be.equal('saturn');
      chai.expect(Voca.lowerCase('EARTH')).to.be.equal('earth');
      chai.expect(Voca.lowerCase('456')).to.be.equal('456');
      chai.expect(Voca.lowerCase('')).to.be.equal('');
    });

    it('should return the lower case of a string representation of an object', function () {
      chai.expect(Voca.lowerCase(['Venus'])).to.be.equal('venus');
      chai.expect(Voca.lowerCase({
        toString: function toString() {
          return 'Venus';
        }
      })).to.be.equal('venus');
    });

    it('should return empty string for null or undefined', function () {
      chai.expect(Voca.lowerCase()).to.be.equal('');
      chai.expect(Voca.lowerCase(undefined)).to.be.equal('');
      chai.expect(Voca.lowerCase(null)).to.be.equal('');
    });
  });

  describe('snakeCase', function () {

    it('should return the snake case of a string', function () {
      chai.expect(Voca.snakeCase('bird')).to.be.equal('bird');
      chai.expect(Voca.snakeCase('BIRD')).to.be.equal('bird');
      chai.expect(Voca.snakeCase('BirdFlight')).to.be.equal('bird_flight');
      chai.expect(Voca.snakeCase('bird flight')).to.be.equal('bird_flight');
      chai.expect(Voca.snakeCase('San Diego Zoo Safari Park')).to.be.equal('san_diego_zoo_safari_park');
      chai.expect(Voca.snakeCase('-BIRD-FLIGHT-')).to.be.equal('bird_flight');
      chai.expect(Voca.snakeCase('__BIRD___FLIGHT___')).to.be.equal('bird_flight');
      chai.expect(Voca.snakeCase('Restless flycatcher')).to.be.equal('restless_flycatcher');
      chai.expect(Voca.snakeCase('XMLHttpRequest')).to.be.equal('xml_http_request');
      chai.expect(Voca.snakeCase('weight of up to 12 kg')).to.be.equal('weight_of_up_to_12_kg');
      chai.expect(Voca.snakeCase('/home/dmitri/projects/voca')).to.be.equal('home_dmitri_projects_voca');
      chai.expect(Voca.snakeCase(PRINTABLE_ASCII)).to.be.equal('0123456789_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz');
      chai.expect(Voca.snakeCase('****')).to.be.equal('');
      chai.expect(Voca.snakeCase('****')).to.be.equal('');
      chai.expect(Voca.snakeCase('-----')).to.be.equal('');
      chai.expect(Voca.snakeCase('     ')).to.be.equal('');
      chai.expect(Voca.snakeCase('\n\n\n\n   ***\t\t')).to.be.equal('');
      chai.expect(Voca.snakeCase('')).to.be.equal('');
    });

    it('should return the snake case of a non-latin string', function () {
      chai.expect(Voca.snakeCase('zborul păsării')).to.be.equal('zborul_păsării');
      chai.expect(Voca.snakeCase('полет птицы')).to.be.equal('полет_птицы');
      chai.expect(Voca.snakeCase('fuerza de sustentación')).to.be.equal('fuerza_de_sustentación');
      chai.expect(Voca.snakeCase('skrzydło ptaka składa się')).to.be.equal('skrzydło_ptaka_składa_się');
    });

    it('should not modify numbers', function () {
      chai.expect(Voca.snakeCase(0)).to.be.equal('0');
      chai.expect(Voca.snakeCase(1200)).to.be.equal('1200');
      chai.expect(Voca.snakeCase('8965')).to.be.equal('8965');
    });

    it('should return the snake case of a string representation of an object', function () {
      chai.expect(Voca.snakeCase(['bird flight'])).to.be.equal('bird_flight');
      chai.expect(Voca.snakeCase({
        toString: function toString() {
          return 'bird flight';
        }
      })).to.be.equal('bird_flight');
    });

    it('should return empty string for null or undefined', function () {
      chai.expect(Voca.snakeCase()).to.be.equal('');
      chai.expect(Voca.snakeCase(undefined)).to.be.equal('');
      chai.expect(Voca.snakeCase(null)).to.be.equal('');
    });
  });

  describe('upperCase', function () {

    it('should return the upper case of a string', function () {
      chai.expect(Voca.upperCase('Saturn')).to.be.equal('SATURN');
      chai.expect(Voca.upperCase('Earth')).to.be.equal('EARTH');
      chai.expect(Voca.upperCase('456')).to.be.equal('456');
      chai.expect(Voca.upperCase('')).to.be.equal('');
    });

    it('should return the upper case of a string representation of an object', function () {
      chai.expect(Voca.upperCase(['Venus'])).to.be.equal('VENUS');
      chai.expect(Voca.upperCase({
        toString: function toString() {
          return 'Venus';
        }
      })).to.be.equal('VENUS');
    });

    it('should return empty string for null or undefined', function () {
      chai.expect(Voca.upperCase()).to.be.equal('');
      chai.expect(Voca.upperCase(undefined)).to.be.equal('');
      chai.expect(Voca.upperCase(null)).to.be.equal('');
    });
  });

  describe('chain', function () {

    it('should calculate the result using explicit chaining', function () {
      chai.expect(Voca.chain('Hello world').value()).to.equal('Hello world');
      chai.expect(Voca.chain('  Hello world  ').trim().value()).to.equal('Hello world');
      chai.expect(Voca.chain('world').isAlpha().value()).to.equal(true);
      chai.expect(Voca.chain('Hello world').lowerCase().replace('hello', 'hi').upperCase().value()).to.equal('HI WORLD');
    });

    it('should calculate the result using implicit chaining', function () {
      chai.expect(Voca('Hello world').lowerCase().words()).to.eql(['hello', 'world']);
      chai.expect(Voca('  Hello world  ').trimLeft().count()).to.equal(13);
      chai.expect(Voca('7 days').replace(/\sdays/, '').isDigit()).to.equal(true);
      chai.expect(Voca('7 days').replace(/\sdays/, '').value()).to.equal('7');
    });

    it('should transform implicit into explicit chaining', function () {
      chai.expect(Voca('Hello world').chain().lowerCase().words().value()).to.eql(['hello', 'world']);
      chai.expect(Voca('15').chain().isNumeric().value()).to.equal(true);
      chai.expect(Voca('15').chain().isNumeric().thru(function (isNumeric) {
        return isNumeric ? 1 : 0;
      }).value()).to.be.equal(1);
    });

    it('should allow to pass thru the wrapped value', function () {
      chai.expect(Voca('Hello world').chain().lowerCase().words().thru(function (words) {
        return words[0];
      }).value()).to.equal('hello');
      chai.expect(Voca.chain('15').isNumeric().thru().value()).to.equal(true);
    });

    it('wrapper object should coerce to a primitive', function () {
      chai.expect('nice' + Voca.chain(' evening ').trimRight()).to.be.equal('nice evening');
      chai.expect(Voca('clouds').upperCase() == 'CLOUDS').to.be.true;
    });

    it('wrapper object should coerce to a string', function () {
      chai.expect('nice ' + Voca.chain('hello world').words()).to.be.equal('nice hello,world');
      chai.expect(Voca('green tree').split(' ') == 'green,tree').to.be.true;
    });

    it('wrapper object should provide toJSON method', function () {
      chai.expect(JSON.stringify(Voca.chain('happy coding').upperCase().split(' '))).to.be.equal('["HAPPY","CODING"]');
    });
  });

  describe('charAt', function () {

    it('should return the character by index', function () {
      chai.expect(Voca.charAt('Good day', 0)).to.be.equal('G');
      chai.expect(Voca.charAt('Good day', 1)).to.be.equal('o');
      chai.expect(Voca.charAt('Good day', 7)).to.be.equal('y');
      chai.expect(Voca.charAt(PRINTABLE_ASCII, 0)).to.be.equal(' ');
      chai.expect(Voca.charAt('', 0)).to.be.equal('');
    });

    it('should return an empty string for out of bounds index', function () {
      chai.expect(Voca.charAt('Good day', -1)).to.be.equal('');
      chai.expect(Voca.charAt('Good day', 100)).to.be.equal('');
    });

    it('should return the character by index of a string representation of an object', function () {
      chai.expect(Voca.charAt(['Good evening'], 5)).to.be.equal('e');
      chai.expect(Voca.charAt({
        toString: function toString() {
          return 'Morning';
        }
      }, 1)).to.be.equal('o');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.charAt()).to.be.equal('');
      chai.expect(Voca.charAt(undefined)).to.be.equal('');
      chai.expect(Voca.charAt(null)).to.be.equal('');
      chai.expect(Voca.charAt(null, null)).to.be.equal('');
      chai.expect(Voca.charAt(undefined, undefined)).to.be.equal('');
    });
  });

  describe('graphemeAt', function () {

    it('should return the grapheme by index', function () {
      chai.expect(Voca.graphemeAt('Good day', 0)).to.be.equal('G');
      chai.expect(Voca.graphemeAt('Good day', 1)).to.be.equal('o');
      chai.expect(Voca.graphemeAt('Good day', 7)).to.be.equal('y');
      chai.expect(Voca.graphemeAt(PRINTABLE_ASCII, 0)).to.be.equal(' ');
      chai.expect(Voca.graphemeAt('mañana', 2)).to.equal('ñ');
      chai.expect(Voca.graphemeAt('é⃝', 0)).to.equal('é⃝');
      chai.expect(Voca.graphemeAt('𝐀𝐁', 1)).to.equal('𝐁');
      chai.expect(Voca.graphemeAt('café', 3)).to.equal('é');
      chai.expect(Voca.graphemeAt('foõ͜͝͞bar', 2)).to.equal('õ͜͝͞');
      chai.expect(Voca.graphemeAt('foo𝌆̃͜͝͞bar𝌆̃͜͝', 3)).to.equal('𝌆̃͜͝͞');
      chai.expect(Voca.graphemeAt('foo𝌆̃͜͝͞bar𝌆̃͜͝', 7)).to.equal('𝌆̃͜͝');
      chai.expect(Voca.graphemeAt('', 0)).to.be.equal('');
    });

    it('should return an empty string for out of bounds index', function () {
      chai.expect(Voca.graphemeAt('Good day', -1)).to.be.equal('');
      chai.expect(Voca.graphemeAt('Good day', 100)).to.be.equal('');
      chai.expect(Voca.graphemeAt('café', 4)).to.be.equal('');
    });

    it('should return the grapheme by index of a string representation of an object', function () {
      chai.expect(Voca.graphemeAt(['Good evening'], 5)).to.be.equal('e');
      chai.expect(Voca.graphemeAt({
        toString: function toString() {
          return 'Morning';
        }
      }, 1)).to.be.equal('o');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.graphemeAt()).to.be.equal('');
      chai.expect(Voca.graphemeAt(undefined)).to.be.equal('');
      chai.expect(Voca.graphemeAt(null)).to.be.equal('');
      chai.expect(Voca.graphemeAt(null, null)).to.be.equal('');
      chai.expect(Voca.graphemeAt(undefined, undefined)).to.be.equal('');
    });
  });

  describe('first', function () {

    it('should return the first part of a string', function () {
      chai.expect(Voca.first('Good day', -1)).to.be.equal('');
      chai.expect(Voca.first('Good day', 0)).to.be.equal('');
      chai.expect(Voca.first('Good day', 4)).to.be.equal('Good');
      chai.expect(Voca.first('Good day', 1)).to.be.equal('G');
      chai.expect(Voca.first('Good day', 8)).to.be.equal('Good day');
      chai.expect(Voca.first('Good day', 1000)).to.be.equal('Good day');
      chai.expect(Voca.first('Good day')).to.be.equal('G');
      chai.expect(Voca.first('', 5)).to.be.equal('');
      chai.expect(Voca.first('', 0)).to.be.equal('');
      chai.expect(Voca.first('')).to.be.equal('');
      chai.expect(Voca.first(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
      chai.expect(Voca.first(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII[0]);
    });

    it('should return the first part of a string representation of an object', function () {
      chai.expect(Voca.first(['Good evening'], 5)).to.be.equal('Good ');
      chai.expect(Voca.first({
        toString: function toString() {
          return 'Morning';
        }
      }, 2)).to.be.equal('Mo');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.first()).to.be.equal('');
      chai.expect(Voca.first(undefined)).to.be.equal('');
      chai.expect(Voca.first(null)).to.be.equal('');
      chai.expect(Voca.first(null, null)).to.be.equal('');
      chai.expect(Voca.first(undefined, undefined)).to.be.equal('');
    });
  });

  describe('last', function () {

    it('should return the last part of a string', function () {
      chai.expect(Voca.last('Good day', -1)).to.be.equal('');
      chai.expect(Voca.last('Good day', 0)).to.be.equal('');
      chai.expect(Voca.last('Good day', 4)).to.be.equal(' day');
      chai.expect(Voca.last('Good day', 1)).to.be.equal('y');
      chai.expect(Voca.last('Good day', 8)).to.be.equal('Good day');
      chai.expect(Voca.last('Good day', 1000)).to.be.equal('Good day');
      chai.expect(Voca.last('Good day')).to.be.equal('y');
      chai.expect(Voca.last('', 5)).to.be.equal('');
      chai.expect(Voca.last('', 0)).to.be.equal('');
      chai.expect(Voca.last('')).to.be.equal('');
      chai.expect(Voca.last(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
      chai.expect(Voca.last(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII[PRINTABLE_ASCII.length - 1]);
    });

    it('should return the last part of a string representation of an object', function () {
      chai.expect(Voca.last(['Good evening'], 5)).to.be.equal('ening');
      chai.expect(Voca.last({
        toString: function toString() {
          return 'Morning';
        }
      }, 2)).to.be.equal('ng');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.last()).to.be.equal('');
      chai.expect(Voca.last(undefined)).to.be.equal('');
      chai.expect(Voca.last(null)).to.be.equal('');
      chai.expect(Voca.last(null, null)).to.be.equal('');
      chai.expect(Voca.last(undefined, undefined)).to.be.equal('');
    });
  });

  describe('prune', function () {

    it('should prune a string', function () {
      chai.expect(Voca.prune('Once upon a time there lived in a certain village a little country girl', 7)).to.be.equal('Once...');
      chai.expect(Voca.prune('I\'ll go this way and go you that', 19, ' (read more)')).to.be.equal('I\'ll go (read more)');
      chai.expect(Voca.prune('Little Red Riding Hood', 6, '...')).to.be.equal('...');
      chai.expect(Voca.prune('Little Red Riding Hood', 9, '...')).to.be.equal('Little...');
      chai.expect(Voca.prune('Little Red Riding Hood', 11, '...')).to.be.equal('Little...');
      chai.expect(Voca.prune('Little Red Riding Hood', 20, '...')).to.be.equal('Little Red Riding...');
      chai.expect(Voca.prune('Little Red Riding Hood', 22, '...')).to.be.equal('Little Red Riding Hood');
      chai.expect(Voca.prune('Little Red Riding Hood', 1, '...')).to.be.equal('...');
      chai.expect(Voca.prune('Little Red Riding Hood', 5, '...')).to.be.equal('...');
      chai.expect(Voca.prune('Little Red Riding Hood', 0, '(more)')).to.be.equal('(more)');
      chai.expect(Voca.prune(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
      chai.expect(Voca.prune(PRINTABLE_ASCII, 0)).to.be.equal('...');
    });

    it('should not prune a string if length parameter is greater or equal than string length', function () {
      chai.expect(Voca.prune('Once upon', 20)).to.be.equal('Once upon');
      chai.expect(Voca.prune('Once', 4, ' (read more)')).to.be.equal('Once');
      chai.expect(Voca.prune('', 0, '....')).to.be.equal('');
    });

    it('should prune a string representation of an object', function () {
      chai.expect(Voca.prune(['Welcome'], 4)).to.be.equal('...');
      chai.expect(Voca.prune({
        toString: function toString() {
          return 'Have a nice day';
        }
      }, 6, '..')).to.be.equal('Have..');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.prune()).to.be.equal('');
      chai.expect(Voca.prune(undefined)).to.be.equal('');
      chai.expect(Voca.prune(null)).to.be.equal('');
    });
  });

  describe('slice', function () {

    it('should slice a string', function () {
      chai.expect(Voca.slice('infinite loop', 9)).to.be.equal('loop');
      chai.expect(Voca.slice('infinite loop', 0)).to.be.equal('infinite loop');
      chai.expect(Voca.slice('infinite loop')).to.be.equal('infinite loop');
      chai.expect(Voca.slice('infinite loop', 1)).to.be.equal('nfinite loop');
      chai.expect(Voca.slice(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
    });

    it('should slice a string with an end position', function () {
      chai.expect(Voca.slice('infinite loop', 9, 12)).to.be.equal('loo');
      chai.expect(Voca.slice('infinite loop', 9, -1)).to.be.equal('loo');
      chai.expect(Voca.slice('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
      chai.expect(Voca.slice('infinite loop', 1, 2)).to.be.equal('n');
      chai.expect(Voca.slice('infinite loop', -4, -1)).to.be.equal('loo');
    });

    it('should slice a string representation of an object', function () {
      chai.expect(Voca.slice(['infinite loop'], 10)).to.be.equal('oop');
      chai.expect(Voca.slice({
        toString: function toString() {
          return 'loop';
        }
      }, 0, 3)).to.be.equal('loo');
    });

    it('should slice a string from a number', function () {
      chai.expect(Voca.slice(12345, 3)).to.be.equal('45');
      chai.expect(Voca.slice(987, 1, 2)).to.be.equal('8');
    });
  });

  describe('substr', function () {

    it('should substract a string', function () {
      chai.expect(Voca.substr('infinite loop', 9)).to.be.equal('loop');
      chai.expect(Voca.substr('infinite loop', 0)).to.be.equal('infinite loop');
      chai.expect(Voca.substr('infinite loop')).to.be.equal('infinite loop');
      chai.expect(Voca.substr('infinite loop', 1)).to.be.equal('nfinite loop');
      chai.expect(Voca.substr('infinite loop', -4)).to.be.equal('loop');
      chai.expect(Voca.substr(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
    });

    it('should substract a string with a length', function () {
      chai.expect(Voca.substr('infinite loop', 9, 3)).to.be.equal('loo');
      chai.expect(Voca.substr('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
      chai.expect(Voca.substr('infinite loop', 1, 1)).to.be.equal('n');
      chai.expect(Voca.substr('infinite loop', -4, 1)).to.be.equal('l');
    });

    it('should substract a string representation of an object', function () {
      chai.expect(Voca.substr(['infinite loop'], 10)).to.be.equal('oop');
      chai.expect(Voca.substr({
        toString: function toString() {
          return 'loop';
        }
      }, 0, 3)).to.be.equal('loo');
    });

    it('should substract a string from a number', function () {
      chai.expect(Voca.substr(12345, 3)).to.be.equal('45');
      chai.expect(Voca.substr(987, 1, 1)).to.be.equal('8');
    });
  });

  describe('substring', function () {

    it('should substring a string', function () {
      chai.expect(Voca.substring('infinite loop', 9)).to.be.equal('loop');
      chai.expect(Voca.substring('infinite loop', 0)).to.be.equal('infinite loop');
      chai.expect(Voca.substring('infinite loop')).to.be.equal('infinite loop');
      chai.expect(Voca.substring('infinite loop', 1)).to.be.equal('nfinite loop');
      chai.expect(Voca.substring(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
    });

    it('should substring a string with an end position', function () {
      chai.expect(Voca.substring('infinite loop', 9, 12)).to.be.equal('loo');
      chai.expect(Voca.substring('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
      chai.expect(Voca.substring('infinite loop', 1, 2)).to.be.equal('n');
    });

    it('should substring a string representation of an object', function () {
      chai.expect(Voca.substring(['infinite loop'], 10)).to.be.equal('oop');
      chai.expect(Voca.substring({
        toString: function toString() {
          return 'loop';
        }
      }, 0, 3)).to.be.equal('loo');
    });

    it('should substring a string from a number', function () {
      chai.expect(Voca.substring(12345, 3)).to.be.equal('45');
      chai.expect(Voca.substring(987, 1, 2)).to.be.equal('8');
    });
  });

  describe('truncate', function () {

    it('should truncate a string', function () {
      chai.expect(Voca.truncate('Once upon a time there lived in a certain village a little country girl', 4)).to.be.equal('O...');
      chai.expect(Voca.truncate('I\'ll go this way and go you that', 19, ' (read more)')).to.be.equal('I\'ll go (read more)');
      chai.expect(Voca.truncate('Little Red Riding Hood', 9, '...')).to.be.equal('Little...');
      chai.expect(Voca.truncate('Little Red Riding Hood', 0, '(more)')).to.be.equal('(more)');
      chai.expect(Voca.truncate('Little Red Riding Hood', 1, '(more)')).to.be.equal('(more)');
      chai.expect(Voca.truncate('Little Red Riding Hood', 2, '(more)')).to.be.equal('(more)');
      chai.expect(Voca.truncate('Little Red Riding Hood', 3, '(more)')).to.be.equal('(more)');
      chai.expect(Voca.truncate('Little Red Riding Hood', 6, '(more)')).to.be.equal('(more)');
      chai.expect(Voca.truncate('Little Red Riding Hood', 7, '(more)')).to.be.equal('L(more)');
      chai.expect(Voca.truncate('Little Red Riding Hood', 7, '')).to.be.equal('Little ');
      chai.expect(Voca.truncate('Little Red Riding Hood', 0, '')).to.be.equal('');
      chai.expect(Voca.truncate(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
      chai.expect(Voca.truncate(PRINTABLE_ASCII, 0)).to.be.equal('...');
    });

    it('should not truncate a string if length parameter is greater or equal than string length', function () {
      chai.expect(Voca.truncate('Once upon', 20)).to.be.equal('Once upon');
      chai.expect(Voca.truncate('Once', 4, ' (read more)')).to.be.equal('Once');
      chai.expect(Voca.truncate('', 0, '....')).to.be.equal('');
    });

    it('should truncate a string representation of an object', function () {
      chai.expect(Voca.truncate(['Welcome'], 6)).to.be.equal('Wel...');
      chai.expect(Voca.truncate({
        toString: function toString() {
          return 'Have a nice day';
        }
      }, 4, '..')).to.be.equal('Ha..');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.truncate()).to.be.equal('');
      chai.expect(Voca.truncate(undefined)).to.be.equal('');
      chai.expect(Voca.truncate(null)).to.be.equal('');
    });
  });

  describe('count', function () {

    it('should return the number of characters in a string', function () {
      chai.expect(Voca.count('rain')).to.be.equal(4);
      chai.expect(Voca.count('')).to.be.equal(0);
      chai.expect(Voca.count('rainbow')).to.be.equal(7);
      chai.expect(Voca.count(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
    });

    it('should return the number of characters in a number', function () {
      chai.expect(Voca.count(123)).to.be.equal(3);
      chai.expect(Voca.count(0)).to.be.equal(1);
      chai.expect(Voca.count(-1.5)).to.be.equal(4);
    });

    it('should return the number of characters in a string representation of an object', function () {
      chai.expect(Voca.count(['droplet'])).to.be.equal(7);
      chai.expect(Voca.count({
        toString: function toString() {
          return 'rainfall';
        }
      })).to.be.equal(8);
    });

    it('should return zero for undefined or null', function () {
      chai.expect(Voca.count()).to.be.equal(0);
      chai.expect(Voca.count(null)).to.be.equal(0);
      chai.expect(Voca.count(undefined)).to.be.equal(0);
    });
  });

  describe('countGrapheme', function () {

    it('should return the number of characters in a string', function () {
      chai.expect(Voca.countGrapheme('rain')).to.be.equal(4);
      chai.expect(Voca.countGrapheme('')).to.be.equal(0);
      chai.expect(Voca.countGrapheme('rainbow')).to.be.equal(7);
      chai.expect(Voca.countGrapheme('é⃝')).to.be.equal(1);
      chai.expect(Voca.countGrapheme('𝐀𝐁')).to.be.equal(2);
      chai.expect(Voca.countGrapheme('mañana')).to.be.equal(6);
      chai.expect(Voca.countGrapheme('café')).to.be.equal(4);
      chai.expect(Voca.countGrapheme('foõ͜͝͞bar')).to.be.equal(6);
      chai.expect(Voca.countGrapheme('foo𝌆̃͜͝͞bar')).to.be.equal(7);
      chai.expect(Voca.countGrapheme(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
    });

    it('should return the number of characters in a number', function () {
      chai.expect(Voca.countGrapheme(123)).to.be.equal(3);
      chai.expect(Voca.countGrapheme(0)).to.be.equal(1);
      chai.expect(Voca.countGrapheme(-1.5)).to.be.equal(4);
    });

    it('should return the number of characters in a string representation of an object', function () {
      chai.expect(Voca.countGrapheme(['droplet'])).to.be.equal(7);
      chai.expect(Voca.countGrapheme({
        toString: function toString() {
          return 'rainfall';
        }
      })).to.be.equal(8);
    });

    it('should return zero for undefined or null', function () {
      chai.expect(Voca.countGrapheme()).to.be.equal(0);
      chai.expect(Voca.countGrapheme(null)).to.be.equal(0);
      chai.expect(Voca.countGrapheme(undefined)).to.be.equal(0);
    });
  });

  describe('countSubstring', function () {

    it('should return the number of substring appearances in a string', function () {
      chai.expect(Voca.countSubstring('Hey man where-where-where\'s your cup holder?', 'where')).to.be.equal(3);
      chai.expect(Voca.countSubstring('And some Skittles', 'Skittles')).to.be.equal(1);
      chai.expect(Voca.countSubstring('And some Skittles', 'chocolate')).to.be.equal(0);
      chai.expect(Voca.countSubstring('******', '*')).to.be.equal(6);
      chai.expect(Voca.countSubstring('*******', '**')).to.be.equal(3);
      chai.expect(Voca.countSubstring('*******', '**-')).to.be.equal(0);
      chai.expect(Voca.countSubstring('*******', '***')).to.be.equal(2);
      chai.expect(Voca.countSubstring('*******', '****')).to.be.equal(1);
      chai.expect(Voca.countSubstring('*******', '********')).to.be.equal(0);
      chai.expect(Voca.countSubstring('*-*-*', '**')).to.be.equal(0);
      chai.expect(Voca.countSubstring('', '')).to.be.equal(0);
      chai.expect(Voca.countSubstring(PRINTABLE_ASCII, '#')).to.be.equal(1);
    });

    it('should return the number of appearances of a number in a number', function () {
      chai.expect(Voca.countSubstring(111222, 1)).to.be.equal(3);
      chai.expect(Voca.countSubstring(0, 0)).to.be.equal(1);
      chai.expect(Voca.countSubstring(15, 16)).to.be.equal(0);
    });

    it('should return the number of substring appearances in a string representation of an object', function () {
      chai.expect(Voca.countSubstring(['where-where-where'], 'where')).to.be.equal(3);
      chai.expect(Voca.countSubstring({
        toString: function toString() {
          return 'where-where-where';
        }
      }, 'where')).to.be.equal(3);
    });

    it('should return zero for undefined or null', function () {
      chai.expect(Voca.countSubstring()).to.be.equal(0);
      chai.expect(Voca.countSubstring(undefined)).to.be.equal(0);
      chai.expect(Voca.countSubstring(null)).to.be.equal(0);
      chai.expect(Voca.countSubstring(undefined, undefined)).to.be.equal(0);
      chai.expect(Voca.countSubstring(null, null)).to.be.equal(0);
    });
  });

  describe('countWhere', function () {

    it('should return the number of characters in a string for a predicate', function () {
      chai.expect(Voca.countWhere('', Voca.isAlpha)).to.be.equal(0);
      chai.expect(Voca.countWhere('africa654', Voca.isAlpha)).to.be.equal(6);
      chai.expect(Voca.countWhere('790', Voca.isAlpha)).to.be.equal(0);
      chai.expect(Voca.countWhere(PRINTABLE_ASCII, Voca.isDigit)).to.be.equal(10);
      chai.expect(Voca.countWhere('****--**--**', function (character) {
        return character === '*';
      })).to.be.equal(8);
      chai.expect(Voca.countWhere('****--**--**', function () {
        return false;
      })).to.be.equal(0);
    });

    it('should invoke the predicate with correct parameters and context', function () {
      var verifyIndex = 0,
          context = {},
          verifyString = '0123456789';
      chai.expect(Voca.countWhere(verifyString, function (character, index, string) {
        chai.expect(index).to.be.equal(verifyIndex);
        chai.expect(this).to.be.equal(context);
        chai.expect(string).to.be.equal(verifyString);
        chai.expect(character).to.be.equal(verifyString[verifyIndex]);
        verifyIndex++;
        return true;
      }, context)).to.be.equal(10);
    });

    it('should return the number of characters in a number for a predicate', function () {
      chai.expect(Voca.countWhere(123, Voca.isDigit)).to.be.equal(3);
      chai.expect(Voca.countWhere(0, Voca.isDigit)).to.be.equal(1);
      chai.expect(Voca.countWhere(-1.5, Voca.isDigit)).to.be.equal(2);
    });

    it('should return the number of characters in a string representation of an object for a predicate', function () {
      chai.expect(Voca.countWhere(['droplet'], Voca.isDigit)).to.be.equal(0);
      chai.expect(Voca.countWhere({
        toString: function toString() {
          return 'homo sapiens';
        }
      }, Voca.isAlphaDigit)).to.be.equal(11);
    });

    it('should return zero for a non function predicate', function () {
      chai.expect(Voca.countWhere('africa')).to.be.equal(0);
      chai.expect(Voca.countWhere('africa', undefined)).to.be.equal(0);
      chai.expect(Voca.countWhere('africa', null)).to.be.equal(0);
      chai.expect(Voca.countWhere('africa', 'africa')).to.be.equal(0);
      chai.expect(Voca.countWhere('africa', 0)).to.be.equal(0);
      chai.expect(Voca.countWhere()).to.be.equal(0);
    });
  });

  describe('escapeHtml', function () {

    it('should return the escaped string', function () {
      chai.expect(Voca.escapeHtml('<>&"\'`')).to.be.equal('&lt;&gt;&amp;&quot;&#x27;&#x60;');
      chai.expect(Voca.escapeHtml('<p>wonderful world</p>')).to.be.equal('&lt;p&gt;wonderful world&lt;/p&gt;');
      chai.expect(Voca.escapeHtml(PRINTABLE_ASCII)).to.be.equal(' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~');
    });

    it('should return the escaped string representation of an object', function () {
      chai.expect(Voca.escapeHtml(['<span>'])).to.be.equal('&lt;span&gt;');
      chai.expect(Voca.escapeHtml({
        toString: function toString() {
          return '<script>';
        }
      })).to.be.equal('&lt;script&gt;');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.escapeHtml()).to.be.equal('');
      chai.expect(Voca.escapeHtml(undefined)).to.be.equal('');
      chai.expect(Voca.escapeHtml(null)).to.be.equal('');
    });
  });

  describe('escapeRegExp', function () {

    it('should return the escaped string', function () {
      chai.expect(Voca.escapeRegExp('-[]/{}()*+?.\\^$|')).to.be.equal('\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|');
      chai.expect(Voca.escapeRegExp('time')).to.be.equal('time');
      chai.expect(Voca.escapeRegExp('500-200')).to.be.equal('500\\-200');
      chai.expect(Voca.escapeRegExp('')).to.be.equal('');
      chai.expect(new RegExp(Voca.escapeRegExp('[a-z0-9]?')).test('[a-z0-9]?')).to.be.true;
      chai.expect(new RegExp(Voca.escapeRegExp('.*')).test('future')).to.be.false;
    });

    it('should return the escaped string representation of an object', function () {
      chai.expect(Voca.escapeRegExp(['-[]object'])).to.be.equal('\\-\\[\\]object');
      chai.expect(Voca.escapeRegExp({
        toString: function toString() {
          return '1.15';
        }
      })).to.be.equal('1\\.15');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.escapeRegExp()).to.be.equal('');
      chai.expect(Voca.escapeRegExp(undefined)).to.be.equal('');
      chai.expect(Voca.escapeRegExp(null)).to.be.equal('');
    });
  });

  describe('unescapeHtml', function () {

    it('should return the unescaped', function () {
      chai.expect(Voca.unescapeHtml('&lt;&gt;&amp;&quot;&#x27;&#x60;')).to.be.equal('<>&"\'`');
      chai.expect(Voca.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
      chai.expect(Voca.unescapeHtml('&#x003C;p&#0062;wonderful world&#x003C;/p&#0062;')).to.be.equal('<p>wonderful world</p>');
      chai.expect(Voca.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
      chai.expect(Voca.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
      chai.expect(Voca.unescapeHtml('&lt; &#x03c; &#060; &gt; &#x03e; &#062; &amp; &#x026; &#038; &quot; &#x022; &#034; &#x027; &#039; &#x060; &#096;')).to.be.equal('< < < > > > & & & " " " \' \' ` `');
      chai.expect(Voca.unescapeHtml(' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~')).to.be.equal(PRINTABLE_ASCII);
      chai.expect(Voca.unescapeHtml('<>&"\'`')).to.be.equal('<>&"\'`');
    });

    it('should return the unescaped string representation of an object', function () {
      chai.expect(Voca.unescapeHtml(['&lt;span&gt;'])).to.be.equal('<span>');
      chai.expect(Voca.unescapeHtml({
        toString: function toString() {
          return '&lt;script&gt;';
        }
      })).to.be.equal('<script>');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.unescapeHtml()).to.be.equal('');
      chai.expect(Voca.unescapeHtml(undefined)).to.be.equal('');
      chai.expect(Voca.unescapeHtml(null)).to.be.equal('');
    });
  });

  describe('coerceToBoolean', function () {

    it('should coerce the value to boolean', function () {
      chai.expect(coerceToBoolean(true)).to.be.equal(true);
      chai.expect(coerceToBoolean(false)).to.be.equal(false);
      chai.expect(coerceToBoolean(1)).to.be.equal(true);
      chai.expect(coerceToBoolean(null)).to.be.equal(false);
      chai.expect(coerceToBoolean(null, true)).to.be.equal(true);
      chai.expect(coerceToBoolean(undefined)).to.be.equal(false);
      chai.expect(coerceToBoolean(undefined, true)).to.be.equal(true);
      chai.expect(coerceToBoolean(undefined, false)).to.be.equal(false);
    });
  });

  describe('coerceToNumber', function () {

    it('should coerce the value to number', function () {
      chai.expect(coerceToNumber(10)).to.be.equal(10);
      chai.expect(coerceToNumber(0)).to.be.equal(0);
      chai.expect(coerceToNumber(true)).to.be.equal(1);
      chai.expect(coerceToNumber(null)).to.be.equal(0);
      chai.expect(coerceToNumber(null, 1)).to.be.equal(1);
      chai.expect(coerceToNumber(undefined)).to.be.equal(0);
      chai.expect(coerceToNumber(undefined, 1)).to.be.equal(1);
      chai.expect(coerceToNumber(undefined, 0)).to.be.equal(0);
    });
  });

  describe('coerceToRegularExpression', function () {

    it('should coerce the pattern to a regular expression', function () {
      var regexp1 = appendFlagToRegularExpression(/.*/g, 'g');
      chai.expect(regexp1).to.be.instanceof(RegExp);
      chai.expect(regexp1.toString()).to.be.equal('/.*/g');
      var regexp2 = appendFlagToRegularExpression(/.*/, 'g');
      chai.expect(regexp2).to.be.instanceof(RegExp);
      chai.expect(regexp2.toString()).to.be.equal('/.*/g');
    });
  });

  describe('sprintf', function () {

    it('should return a string according to string type formatting', function () {
      chai.expect(Voca.sprintf('%s', 'string')).to.be.equal('string');
      chai.expect(Voca.sprintf('Hello %s!', 'World')).to.be.equal('Hello World!');
      chai.expect(Voca.sprintf('%s %s!', 'Hello', 'World')).to.be.equal('Hello World!');
      chai.expect(Voca.sprintf('%s %s!', '%s', '%s')).to.be.equal('%s %s!');
      chai.expect(Voca.sprintf('Hello %5s!', 'World')).to.be.equal('Hello World!');
      chai.expect(Voca.sprintf('Hello %3s!', 'World')).to.be.equal('Hello World!');
      chai.expect(Voca.sprintf('Hello %8s!', 'World')).to.be.equal('Hello    World!');
      chai.expect(Voca.sprintf('%s%s%s%s%s', 'Alexander', ' ', 'the', ' ', 'Great')).to.be.equal('Alexander the Great');
      chai.expect(Voca.sprintf('Alexander the %08s', 'Great')).to.be.equal('Alexander the 000Great');
      chai.expect(Voca.sprintf('Alexander the % 8s', 'Great')).to.be.equal('Alexander the    Great');
      chai.expect(Voca.sprintf("%'-10s the %s", 'Alexander', 'Great')).to.be.equal('-Alexander the Great');
      chai.expect(Voca.sprintf("%'.12s the %09s", 'Alexander', 'Great')).to.be.equal('...Alexander the 0000Great');
      chai.expect(Voca.sprintf('%-12s', 'Alexander')).to.be.equal('Alexander   ');
      chai.expect(Voca.sprintf('%+-12s', 'Alexander')).to.be.equal('Alexander   ');
      chai.expect(Voca.sprintf('%.4s the Great', 'Alexander')).to.be.equal('Alex the Great');
      chai.expect(Voca.sprintf('%.9s the Great', 'Alexander')).to.be.equal('Alexander the Great');
      chai.expect(Voca.sprintf('%.0s the Great', 'Alexander')).to.be.equal(' the Great');
      chai.expect(Voca.sprintf('%10.8s the Great', 'Alexander')).to.be.equal('  Alexande the Great');
      chai.expect(Voca.sprintf('%\'-10.6s %\'1-12.4s', 'Persian', 'Empire')).to.be.equal('----Persia Empi11111111');
      chai.expect(Voca.sprintf('%2$s the %1$s', 'Great', 'Alexander')).to.be.equal('Alexander the Great');
      chai.expect(Voca.sprintf('%2$s', 'Great', 'Alexander')).to.be.equal('Alexander');
      chai.expect(Voca.sprintf('%2$\'012s the %1$.4s', 'Great', 'Alexander')).to.be.equal('000Alexander the Grea');
      chai.expect(Voca.sprintf('%%%1$\'q-12.4s%%s', 'Alexander')).to.be.equal('%Alexqqqqqqqq%s');
      chai.expect(Voca.sprintf('%2$s the %s', 'Great', 'Alexander')).to.be.equal('Alexander the Great');
      chai.expect(Voca.sprintf('%1$s the %s', 'Great')).to.be.equal('Great the Great');
    });

    it('should return a string according to decimal integer type formatting', function () {
      chai.expect(Voca.sprintf('%d', 1)).to.be.equal('1');
      chai.expect(Voca.sprintf('%i', 1)).to.be.equal('1');
      chai.expect(Voca.sprintf('%d %d %d', 1, 0, -100)).to.be.equal('1 0 -100');
      chai.expect(Voca.sprintf('%+d %+d', 10, -10)).to.be.equal('+10 -10');
      chai.expect(Voca.sprintf("%+'t4d %4d", 9, 0)).to.be.equal('tt+9    0');
      chai.expect(Voca.sprintf("%010i", 90)).to.be.equal('0000000090');
      chai.expect(Voca.sprintf("%+ 8d", 88)).to.be.equal('     +88');
      chai.expect(Voca.sprintf("%d+%d=%d", 9, 1, 10)).to.be.equal('9+1=10');
      chai.expect(Voca.sprintf("%3$04d-%2$04d=%1$04d", 9, 1, 10)).to.be.equal('0010-0001=0009');
      chai.expect(Voca.sprintf("%+'T-5d", 15)).to.be.equal('+15TT');
      chai.expect(Voca.sprintf("%d", 1.5e+3)).to.be.equal('1500');
      chai.expect(Voca.sprintf("%d", '15NN')).to.be.equal('15');
      chai.expect(Voca.sprintf("%d", '1.6')).to.be.equal('1');
      chai.expect(Voca.sprintf("%d", '1.5e+3')).to.be.equal('1');
      chai.expect(Voca.sprintf("%d", 'NN15')).to.be.equal('0');
      chai.expect(Voca.sprintf("%d %d", '', 15)).to.be.equal('0 15');
      chai.expect(Voca.sprintf("%d", '+')).to.be.equal('0');
    });

    it('should return a string according to binary integer type formatting', function () {
      chai.expect(Voca.sprintf('%b', 1)).to.be.equal('1');
      chai.expect(Voca.sprintf('%b %b 0b%b', 1, 0, 10)).to.be.equal('1 0 0b1010');
      chai.expect(Voca.sprintf('%+b %+b', 10, 10)).to.be.equal('1010 1010');
      chai.expect(Voca.sprintf("%+'t6b %4b", 9, 0)).to.be.equal('tt1001    0');
      chai.expect(Voca.sprintf("%010b", 90)).to.be.equal('0001011010');
      chai.expect(Voca.sprintf("%+ 8b", 88)).to.be.equal(' 1011000');
      chai.expect(Voca.sprintf("%b+%b=%b", 9, 1, 10)).to.be.equal('1001+1=1010');
      chai.expect(Voca.sprintf("%3$04b-%2$04b=%1$04b", 4, 1, 5)).to.be.equal('0101-0001=0100');
      chai.expect(Voca.sprintf("%+'T-5b", 15)).to.be.equal('1111T');
      chai.expect(Voca.sprintf("%b", 1.5e+3)).to.be.equal('10111011100');
      chai.expect(Voca.sprintf("%b", '15NN')).to.be.equal('1111');
      chai.expect(Voca.sprintf("%b", '1.6')).to.be.equal('1');
      chai.expect(Voca.sprintf("%b", '1.5e+3')).to.be.equal('1');
      chai.expect(Voca.sprintf("%b", 'NN15')).to.be.equal('0');
      chai.expect(Voca.sprintf("%b %b", '', 15)).to.be.equal('0 1111');
      chai.expect(Voca.sprintf("%b", '+')).to.be.equal('0');
      chai.expect(Voca.sprintf("%b %b", -1, -10)).to.be.equal('11111111111111111111111111111111 11111111111111111111111111110110');
    });

    it('should return a string according to octal integer type formatting', function () {
      chai.expect(Voca.sprintf('%o', 1)).to.be.equal('1');
      chai.expect(Voca.sprintf('%o %o 0%o', 1, 0, 10)).to.be.equal('1 0 012');
      chai.expect(Voca.sprintf('%+o %+o', 10, 10)).to.be.equal('12 12');
      chai.expect(Voca.sprintf("%+'t6o %4o", 9, 0)).to.be.equal('tttt11    0');
      chai.expect(Voca.sprintf("%010o", 90)).to.be.equal('0000000132');
      chai.expect(Voca.sprintf("%+ 8o", 88)).to.be.equal('     130');
      chai.expect(Voca.sprintf("%o+%o=%o", 9, 1, 10)).to.be.equal('11+1=12');
      chai.expect(Voca.sprintf("%3$04o-%2$04o=%1$04o", 35, 5, 40)).to.be.equal('0050-0005=0043');
      chai.expect(Voca.sprintf("%+'T-5o", 15)).to.be.equal('17TTT');
      chai.expect(Voca.sprintf("%o", 1.5e+3)).to.be.equal('2734');
      chai.expect(Voca.sprintf("%o", '15NN')).to.be.equal('17');
      chai.expect(Voca.sprintf("%o", '1.6')).to.be.equal('1');
      chai.expect(Voca.sprintf("%o", '1.5e+3')).to.be.equal('1');
      chai.expect(Voca.sprintf("%o", 'NN15')).to.be.equal('0');
      chai.expect(Voca.sprintf("%o %o", '', 15)).to.be.equal('0 17');
      chai.expect(Voca.sprintf("%o", '+')).to.be.equal('0');
      chai.expect(Voca.sprintf("%o %o", -1, -10)).to.be.equal('37777777777 37777777766');
    });

    it('should return a string according to hexadecimal integer type formatting', function () {
      chai.expect(Voca.sprintf('%x-%X', 1, 14)).to.be.equal('1-E');
      chai.expect(Voca.sprintf('%x %x 0X%x', 1, 0, 20)).to.be.equal('1 0 0X14');
      chai.expect(Voca.sprintf('%+x %+x', 10, 50)).to.be.equal('a 32');
      chai.expect(Voca.sprintf("%+'t6x %4x", 30, 0)).to.be.equal('tttt1e    0');
      chai.expect(Voca.sprintf("%010x", 90)).to.be.equal('000000005a');
      chai.expect(Voca.sprintf("%+ 8x", 88)).to.be.equal('      58');
      chai.expect(Voca.sprintf("%x+%x=%x", 90, 10, 100)).to.be.equal('5a+a=64');
      chai.expect(Voca.sprintf("%3$04x-%2$04x=%1$04x", 35, 5, 40)).to.be.equal('0028-0005=0023');
      chai.expect(Voca.sprintf("%+'T-5x", 15)).to.be.equal('fTTTT');
      chai.expect(Voca.sprintf("%1$x %1$X", 1.5e+3)).to.be.equal('5dc 5DC');
      chai.expect(Voca.sprintf("%x", '15NN')).to.be.equal('f');
      chai.expect(Voca.sprintf("%x", '1.6')).to.be.equal('1');
      chai.expect(Voca.sprintf("%x", '1.5e+3')).to.be.equal('1');
      chai.expect(Voca.sprintf("%x", 'NN15')).to.be.equal('0');
      chai.expect(Voca.sprintf("%x %x", '', 15)).to.be.equal('0 f');
      chai.expect(Voca.sprintf("%x", '+')).to.be.equal('0');
      chai.expect(Voca.sprintf("%x %x", -1, -10)).to.be.equal('ffffffff fffffff6');
    });

    it('should return a string according to unsigned decimal integer type formatting', function () {
      chai.expect(Voca.sprintf('%u-%u', 1, 14)).to.be.equal('1-14');
      chai.expect(Voca.sprintf('%u %u %u', 1, 0, 20)).to.be.equal('1 0 20');
      chai.expect(Voca.sprintf('%+u %+u', 10, 50)).to.be.equal('10 50');
      chai.expect(Voca.sprintf("%+'t6u %4u", 30, 0)).to.be.equal('tttt30    0');
      chai.expect(Voca.sprintf("%010u", 90)).to.be.equal('0000000090');
      chai.expect(Voca.sprintf("%+ 8u", 88)).to.be.equal('      88');
      chai.expect(Voca.sprintf("%u+%u=%u", 90, 10, 100)).to.be.equal('90+10=100');
      chai.expect(Voca.sprintf("%3$04u-%2$04u=%1$04u", 35, 5, 40)).to.be.equal('0040-0005=0035');
      chai.expect(Voca.sprintf("%+'T-5u", 15)).to.be.equal('15TTT');
      chai.expect(Voca.sprintf("%1$u %1$u", 1.5e+3)).to.be.equal('1500 1500');
      chai.expect(Voca.sprintf("%u", '15NN')).to.be.equal('15');
      chai.expect(Voca.sprintf("%u", '1.6')).to.be.equal('1');
      chai.expect(Voca.sprintf("%u", '1.5e+3')).to.be.equal('1');
      chai.expect(Voca.sprintf("%u", 'NN15')).to.be.equal('0');
      chai.expect(Voca.sprintf("%u %u", '', 15)).to.be.equal('0 15');
      chai.expect(Voca.sprintf("%u", '+')).to.be.equal('0');
      chai.expect(Voca.sprintf("%u %u", -1, -10)).to.be.equal('4294967295 4294967286');
    });

    it('should return a string according to ascii integer type formatting', function () {
      chai.expect(Voca.sprintf('%c %c %c', 65, 0x0020, 48)).to.be.equal('A   0');
      chai.expect(Voca.sprintf('%5c', 65)).to.be.equal('    A');
      chai.expect(Voca.sprintf('%02c', 65)).to.be.equal('0A');
      chai.expect(Voca.sprintf('%-5c', 65)).to.be.equal('A    ');
      chai.expect(Voca.sprintf('%+\'t-4c', '110')).to.be.equal('nttt');
    });

    it('should return a string according to float type formatting', function () {
      chai.expect(Voca.sprintf('%f %f', 1, 0)).to.be.equal('1.000000 0.000000');
      chai.expect(Voca.sprintf('%+f+%+f', 50.123456789, 0)).to.be.equal('+50.123457++0.000000');
      chai.expect(Voca.sprintf('%1$.0f %1$.1f %1$.2f', 1.57)).to.be.equal('2 1.6 1.57');
      chai.expect(Voca.sprintf('%.2f %0.2f', 0, 0)).to.be.equal('0.00 0.00');
      chai.expect(Voca.sprintf('%4f %05.2f', -15.789, 1.27)).to.be.equal('-15.789000 01.27');
      chai.expect(Voca.sprintf("%'f10f", 1.5)).to.be.equal('ff1.500000');
      chai.expect(Voca.sprintf("%+-12f", 101.101)).to.be.equal('+101.101000 ');
      chai.expect(Voca.sprintf("%+'s-15.10f", 9.7654321)).to.be.equal('+9.7654321000ss');
      chai.expect(Voca.sprintf("%06.2f", 8)).to.be.equal('008.00');
      chai.expect(Voca.sprintf('%f %.1f', '34.111', '-15.67')).to.be.equal('34.111000 -15.7');
      chai.expect(Voca.sprintf('%.3f %.2f', '1.123456e+0', '1.3E+2')).to.be.equal('1.123 130.00');
      chai.expect(Voca.sprintf('%.3f', '-567.123456e+6')).to.be.equal('-567123456.000');
      chai.expect(Voca.sprintf('%f %f %f', '1FF', '-15.67TUU', '.1')).to.be.equal('1.000000 -15.670000 0.100000');
      chai.expect(Voca.sprintf('%f %f %f', 'FF', '', '+')).to.be.equal('0.000000 0.000000 0.000000');
    });

    it('should return a string according to scientific float type formatting', function () {
      chai.expect(Voca.sprintf('%e %e %E', 100, 0, .1)).to.be.equal('1.000000e+2 0.000000e+0 1.000000E-1');
      chai.expect(Voca.sprintf('%+e+%+e', 50.123456789, 0)).to.be.equal('+5.012346e+1++0.000000e+0');
      chai.expect(Voca.sprintf('%1$.0e %1$.1e %1$.2e', 1.57)).to.be.equal('2e+0 1.6e+0 1.57e+0');
      chai.expect(Voca.sprintf('%.2e %0.2e', 0, 0)).to.be.equal('0.00e+0 0.00e+0');
      chai.expect(Voca.sprintf('%.0e %.0e', 0, 15.7)).to.be.equal('0e+0 2e+1');
      chai.expect(Voca.sprintf('%4e %08.2e', -15.789, 1.27)).to.be.equal('-1.578900e+1 01.27e+0');
      chai.expect(Voca.sprintf("%'f15e", 0.105)).to.be.equal('ffff1.050000e-1');
      chai.expect(Voca.sprintf("%+-14e", 101.101)).to.be.equal('+1.011010e+2  ');
      chai.expect(Voca.sprintf("%+'s-20.10e", 0.097654321)).to.be.equal('+9.7654321000e-2ssss');
      chai.expect(Voca.sprintf("%08.2e", 8)).to.be.equal('08.00e+0');
      chai.expect(Voca.sprintf('%e %.1e', '34.111', '-15.67')).to.be.equal('3.411100e+1 -1.6e+1');
      chai.expect(Voca.sprintf('%.3E %.2E', '1.123456e+0', '1.3E+2')).to.be.equal('1.123E+0 1.30E+2');
      chai.expect(Voca.sprintf('%.4e', '-567.123456e+6')).to.be.equal('-5.6712e+8');
      chai.expect(Voca.sprintf('%e %e %e', '1FF', '-15.67TUU', '.1')).to.be.equal('1.000000e+0 -1.567000e+1 1.000000e-1');
      chai.expect(Voca.sprintf('%e %e %e', 'FF', '', '+')).to.be.equal('0.000000e+0 0.000000e+0 0.000000e+0');
    });

    it('should return a string according to short float type formatting', function () {
      chai.expect(Voca.sprintf('%g %g %g', 100, 0, .1)).to.be.equal('100 0 0.1');
      chai.expect(Voca.sprintf('%+g+%+g', 50.123456789, 0)).to.be.equal('+50.1235++0');
      chai.expect(Voca.sprintf('%1$.0g %1$.1g %1$.2g', 1.57)).to.be.equal('2 2 1.6');
      chai.expect(Voca.sprintf('%.2g %0.2g', 0, 0)).to.be.equal('0 0');
      chai.expect(Voca.sprintf('%.0g', 0)).to.be.equal('0');
      chai.expect(Voca.sprintf('%.0g %.0g', 0, 15.7)).to.be.equal('0 2e+1');
      chai.expect(Voca.sprintf('%4g %08.2g', -15.789, 1.27)).to.be.equal('-15.789 000001.3');
      chai.expect(Voca.sprintf("%'f15g", 0.105)).to.be.equal('ffffffffff0.105');
      chai.expect(Voca.sprintf("%+-14g", 101.101)).to.be.equal('+101.101      ');
      chai.expect(Voca.sprintf("%+'s-20.10g", 0.0976543216)).to.be.equal('+0.0976543216sssssss');
      chai.expect(Voca.sprintf("%+'s-20.8g", 0.0976543216)).to.be.equal('+0.097654322ssssssss');
      chai.expect(Voca.sprintf("%08.2g", 8)).to.be.equal('00000008');
      chai.expect(Voca.sprintf('%g %.1G', '34.111', '-15.67')).to.be.equal('34.111 -2E+1');
      chai.expect(Voca.sprintf('_%.3G_%.2G_!1234567890*', '1.123456e+0', '1.3E+2')).to.be.equal('_1.12_1.3E+2_!1234567890*');
      chai.expect(Voca.sprintf('%.4g', '-567.123456e+6')).to.be.equal('-5.671e+8');
      chai.expect(Voca.sprintf('%g %G %g', '1FF', '-15.67TUU', '.1')).to.be.equal('1 -15.67 0.1');
      chai.expect(Voca.sprintf('%g %G %g', 'FF', '', '+')).to.be.equal('0 0 0');
    });

    it('should return a string according to format', function () {
      chai.expect(Voca.sprintf('%s costs $%.2f', 'Coffee', 2)).to.be.equal('Coffee costs $2.00');
      chai.expect(Voca.sprintf('%%s like %s', 'Coffee')).to.be.equal('%s like Coffee');
      chai.expect(Voca.sprintf("Full format: %'*10s %+d %i %04b %c %o %u %X %.0f %e %g %%", 'string', 18, -5, 4, 65, 8, 401, 255, 8.9, 50.12, 10.123456789)).to.be.equal('Full format: ****string +18 -5 0100 A 10 401 FF 9 5.012000e+1 10.1235 %');
      chai.expect(Voca.sprintf('%s%d%%%s', 'word', 10, 'word')).to.be.equal('word10%word');
    });

    it('should ignore specifiers with double percent characters', function () {
      chai.expect(Voca.sprintf('%%s')).to.be.equal('%s');
      chai.expect(Voca.sprintf('%%s %s', 'Persian')).to.be.equal('%s Persian');
      chai.expect(Voca.sprintf('%% %%')).to.be.equal('% %');
      chai.expect(Voca.sprintf('%%%% %%%%%s', 'Babylon')).to.be.equal('%% %%Babylon');
    });

    it('should throw exceptions when the formatter is not valid or not enough arguments', function () {
      chai.expect(Voca.sprintf.bind(Voca, '%s')).to.throw(Error, 'sprintf(): Too few arguments');
      chai.expect(Voca.sprintf.bind(Voca, '%s %s')).to.throw(Error, 'sprintf(): Too few arguments');
      chai.expect(Voca.sprintf.bind(Voca, '%s %s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
      chai.expect(Voca.sprintf.bind(Voca, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
      chai.expect(Voca.sprintf.bind(Voca, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
      chai.expect(Voca.sprintf.bind(Voca, '%a', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
      chai.expect(Voca.sprintf.bind(Voca, PRINTABLE_ASCII, 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
      chai.expect(Voca.sprintf.bind(Voca, '%s the %y', 'Alexander', 'Great')).to.throw(Error, 'sprintf(): Unknown type specifier');
      chai.expect(Voca.sprintf.bind(Voca, '%', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
      chai.expect(Voca.sprintf.bind(Voca, '%%%%% %%', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
      chai.expect(Voca.sprintf.bind(Voca, '%0$s', 'Alexander')).to.throw(Error, 'sprintf(): Argument number must be greater than zero');
    });

    it('should return an unmodified string for missing formatting specifiers', function () {
      chai.expect(Voca.sprintf('Without formatting')).to.be.equal('Without formatting');
      chai.expect(Voca.sprintf('')).to.be.equal('');
      chai.expect(Voca.sprintf()).to.be.equal('');
      chai.expect(Voca.sprintf(undefined)).to.be.equal('');
      chai.expect(Voca.sprintf(null)).to.be.equal('');
    });
  });

  describe('vprintf', function () {

    it('should return a string according to formatting', function () {
      chai.expect(Voca.vprintf('%s', ['string'])).to.be.equal('string');
      chai.expect(Voca.vprintf('Hello %s!', ['World'])).to.be.equal('Hello World!');
      chai.expect(Voca.vprintf('%d %d %d', [1, 0, -100])).to.be.equal('1 0 -100');
      chai.expect(Voca.vprintf('%b %b 0b%b', [1, 0, 10])).to.be.equal('1 0 0b1010');
      chai.expect(Voca.vprintf('%o %o 0%o', [1, 0, 10])).to.be.equal('1 0 012');
      chai.expect(Voca.vprintf('%x %x 0X%x', [1, 0, 20])).to.be.equal('1 0 0X14');
      chai.expect(Voca.vprintf('%u %u %u', [1, 0, 20])).to.be.equal('1 0 20');
      chai.expect(Voca.vprintf('%c %c %c', [65, 0x0020, 48])).to.be.equal('A   0');
      chai.expect(Voca.vprintf('%+f+%+f', [50.123456789, 0])).to.be.equal('+50.123457++0.000000');
      chai.expect(Voca.vprintf('%e %e %E', [100, 0, .1])).to.be.equal('1.000000e+2 0.000000e+0 1.000000E-1');
      chai.expect(Voca.vprintf('%+g+%+g', [50.123456789, 0])).to.be.equal('+50.1235++0');
      chai.expect(Voca.vprintf("Full format: %'*10s %+d %i %04b %c %o %u %X %.0f %e %g %%", ['string', 18, -5, 4, 65, 8, 401, 255, 8.9, 50.12, 10.123456789])).to.be.equal('Full format: ****string +18 -5 0100 A 10 401 FF 9 5.012000e+1 10.1235 %');
      chai.expect(Voca.vprintf('%%s %s', ['Persian'])).to.be.equal('%s Persian');
    });

    it('should throw exceptions when the formatter is not valid or not enough arguments', function () {
      chai.expect(Voca.vprintf.bind(Voca, '%2$s %1$s', ['Alexander'])).to.throw(Error, 'sprintf(): Too few arguments');
      chai.expect(Voca.vprintf.bind(Voca, '%a', ['Alexander'])).to.throw(Error, 'sprintf(): Unknown type specifier');
      chai.expect(Voca.vprintf.bind(Voca, PRINTABLE_ASCII, ['Alexander'])).to.throw(Error, 'sprintf(): Unknown type specifier');
      chai.expect(Voca.vprintf.bind(Voca, '%0$s', ['Alexander'])).to.throw(Error, 'sprintf(): Argument number must be greater than zero');
    });

    it('should return an unmodified string for missing formatting specifiers', function () {
      chai.expect(Voca.vprintf('Without formatting')).to.be.equal('Without formatting');
      chai.expect(Voca.vprintf('Without formatting', [])).to.be.equal('Without formatting');
      chai.expect(Voca.vprintf('Without formatting', [undefined])).to.be.equal('Without formatting');
      chai.expect(Voca.vprintf('')).to.be.equal('');
      chai.expect(Voca.vprintf(' ')).to.be.equal(' ');
      chai.expect(Voca.vprintf()).to.be.equal('');
      chai.expect(Voca.vprintf(undefined)).to.be.equal('');
      chai.expect(Voca.vprintf(null)).to.be.equal('');
    });
  });

  describe('indexOf', function () {

    it('should return the index of a searched string', function () {
      chai.expect(Voca.indexOf('we have a mission', 'mission')).to.be.equal(10);
      chai.expect(Voca.indexOf('we have a mission', 'a')).to.be.equal(4);
      chai.expect(Voca.indexOf('we have a mission', 'we')).to.be.equal(0);
      chai.expect(Voca.indexOf('we have a mission', '')).to.be.equal(0);
      chai.expect(Voca.indexOf('', '')).to.be.equal(0);
      chai.expect(Voca.indexOf(undefined, '')).to.be.equal(0);
      chai.expect(Voca.indexOf(null, '')).to.be.equal(0);
      chai.expect(Voca.indexOf(PRINTABLE_ASCII, '!')).to.be.equal(1);
    });

    it('should return the index of a searched string and start index', function () {
      chai.expect(Voca.indexOf('we have a mission', 'a', 6)).to.be.equal(8);
      chai.expect(Voca.indexOf('we have a mission', 'we', 0)).to.be.equal(0);
      chai.expect(Voca.indexOf('we have a mission', 'we', NaN)).to.be.equal(0);
      chai.expect(Voca.indexOf('we have a mission', '', 0)).to.be.equal(0);
      chai.expect(Voca.indexOf(PRINTABLE_ASCII, '#', 3)).to.be.equal(3);
    });

    it('should return the index of a searched string in a string representation of an object', function () {
      chai.expect(Voca.indexOf(['we have a mission'], 'a')).to.be.equal(4);
      chai.expect(Voca.indexOf({
        toString: function toString() {
          return 'we have a mission';
        }
      }, 'we')).to.be.equal(0);
    });

    it('should return -1 for an invalid ending string and position', function () {
      chai.expect(Voca.indexOf('we have a mission', 'me')).to.be.equal(-1);
      chai.expect(Voca.indexOf('we have a mission', '12')).to.be.equal(-1);
      chai.expect(Voca.indexOf('we have a mission', 'we', 3)).to.be.equal(-1);
      chai.expect(Voca.indexOf('we have a mission', 'mission', 100)).to.be.equal(-1);
      chai.expect(Voca.indexOf('we have a mission', 'mission', Infinity)).to.be.equal(-1);
      chai.expect(Voca.indexOf('', 'me')).to.be.equal(-1);
    });

    it('should return -1 for undefined and null parameters', function () {
      chai.expect(Voca.indexOf('we have a mission')).to.be.equal(-1);
      chai.expect(Voca.indexOf('we have a mission', undefined)).to.be.equal(-1);
      chai.expect(Voca.indexOf('we have a mission', null)).to.be.equal(-1);
    });
  });

  describe('lastIndexOf', function () {

    it('should return the index of a searched string', function () {
      chai.expect(Voca.lastIndexOf('we have a mission', 'mission')).to.be.equal(10);
      chai.expect(Voca.lastIndexOf('we have a mission', 'a')).to.be.equal(8);
      chai.expect(Voca.lastIndexOf('we have a mission', 'we')).to.be.equal(0);
      chai.expect(Voca.lastIndexOf('we have a mission', '')).to.be.equal(17);
      chai.expect(Voca.lastIndexOf('', '')).to.be.equal(0);
      chai.expect(Voca.lastIndexOf(undefined, '')).to.be.equal(0);
      chai.expect(Voca.lastIndexOf(null, '')).to.be.equal(0);
      chai.expect(Voca.lastIndexOf(PRINTABLE_ASCII, '!')).to.be.equal(1);
    });

    it('should return the index of a searched string and start index', function () {
      chai.expect(Voca.lastIndexOf('we have a mission', 'a', 17)).to.be.equal(8);
      chai.expect(Voca.lastIndexOf('we have a mission', 'a', 6)).to.be.equal(4);
      chai.expect(Voca.lastIndexOf('we have a mission', 'we', 15)).to.be.equal(0);
      chai.expect(Voca.lastIndexOf('we have a mission', 'we', 17)).to.be.equal(0);
      chai.expect(Voca.lastIndexOf('we have a mission', '', 1)).to.be.equal(1);
      chai.expect(Voca.lastIndexOf(PRINTABLE_ASCII, '#', PRINTABLE_ASCII.length - 3)).to.be.equal(3);
    });

    it('should return the index of a searched string in a string representation of an object', function () {
      chai.expect(Voca.lastIndexOf(['we have a mission'], 'a')).to.be.equal(8);
      chai.expect(Voca.lastIndexOf({
        toString: function toString() {
          return 'we have a mission';
        }
      }, 'we')).to.be.equal(0);
    });

    it('should return -1 for an invalid ending string and position', function () {
      chai.expect(Voca.lastIndexOf('we have a mission', 'me')).to.be.equal(-1);
      chai.expect(Voca.lastIndexOf('we have a mission', '12')).to.be.equal(-1);
      chai.expect(Voca.lastIndexOf('we have a mission', 'mission', -100)).to.be.equal(-1);
      chai.expect(Voca.lastIndexOf('we have a mission', 'mission', -Infinity)).to.be.equal(-1);
      chai.expect(Voca.lastIndexOf('', 'me')).to.be.equal(-1);
    });

    it('should return -1 for undefined and null parameters', function () {
      chai.expect(Voca.lastIndexOf('we have a mission')).to.be.equal(-1);
      chai.expect(Voca.lastIndexOf('we have a mission', undefined)).to.be.equal(-1);
      chai.expect(Voca.lastIndexOf('we have a mission', null)).to.be.equal(-1);
    });
  });

  describe('search', function () {

    it('should return the index of a match', function () {
      chai.expect(Voca.search('we have a mission', /mission/)).to.be.equal(10);
      chai.expect(Voca.search('we have a mission', 'a')).to.be.equal(4);
      chai.expect(Voca.search('we have a mission', /we/)).to.be.equal(0);
      chai.expect(Voca.search('we have a mission', /\s/)).to.be.equal(2);
      chai.expect(Voca.search('we have a mission', '')).to.be.equal(0);
      chai.expect(Voca.search('', '')).to.be.equal(0);
      chai.expect(Voca.search(undefined, '')).to.be.equal(0);
      chai.expect(Voca.search(null, '')).to.be.equal(0);
      chai.expect(Voca.search(PRINTABLE_ASCII, '!')).to.be.equal(1);
    });

    it('should return the index of a match and start index', function () {
      chai.expect(Voca.search('we have a mission', /a/, 6)).to.be.equal(8);
      chai.expect(Voca.search('we have a mission', /we/, 0)).to.be.equal(0);
      chai.expect(Voca.search('we have a mission', 'we', NaN)).to.be.equal(0);
      chai.expect(Voca.search('we have a mission', '', 0)).to.be.equal(0);
      chai.expect(Voca.search(PRINTABLE_ASCII, '#', 3)).to.be.equal(3);
    });

    it('should return the index of a searched string in a string representation of an object', function () {
      chai.expect(Voca.search(['we have a mission'], /a/)).to.be.equal(4);
      chai.expect(Voca.search({
        toString: function toString() {
          return 'we have a mission';
        }
      }, /we/)).to.be.equal(0);
    });

    it('should threat a null value as "null" match pattern', function () {
      chai.expect(Voca.search('we have a null mission', null)).to.be.equal(10);
      chai.expect(Voca.search('we have a mission', null)).to.be.equal(-1);
    });

    it('should return -1 for an invalid ending string and position', function () {
      chai.expect(Voca.search('we have a mission', /me/)).to.be.equal(-1);
      chai.expect(Voca.search('we have a mission', /12/)).to.be.equal(-1);
      chai.expect(Voca.search('we have a mission', /\s^/)).to.be.equal(-1);
      chai.expect(Voca.search('we have a mission', 'we', 3)).to.be.equal(-1);
      chai.expect(Voca.search('we have a mission', /mission/, 100)).to.be.equal(-1);
      chai.expect(Voca.search('we have a mission', /mission/, Infinity)).to.be.equal(-1);
      chai.expect(Voca.search('', /me/)).to.be.equal(-1);
    });

    it('should return 0 for an undefined', function () {
      chai.expect(Voca.search('we have a mission')).to.be.equal(0);
      chai.expect(Voca.search('we have a mission', undefined)).to.be.equal(0);
    });
  });

  describe('latinise', function () {

    it('should latinise a string', function () {
      chai.expect(Voca.latinise('')).to.be.equal('');
      chai.expect(Voca.latinise('moldova')).to.be.equal('moldova');
      chai.expect(Voca.latinise('café')).to.be.equal('cafe');
      chai.expect(Voca.latinise('ma\xF1ana')).to.be.equal('manana');
      chai.expect(Voca.latinise('mañana')).to.be.equal('manana');
      chai.expect(Voca.latinise('foõ͜͝͞bar')).to.be.equal('foobar');
      chai.expect(Voca.latinise('café')).to.be.equal('cafe');
      chai.expect(Voca.latinise('colecção cópias críticos é tão')).to.be.equal('coleccao copias criticos e tao');
      chai.expect(Voca.latinise('književnošću čuvanje')).to.be.equal('knjizevnoscu cuvanje');
      chai.expect(Voca.latinise('anglikonų šiurkščios užrašinėti')).to.be.equal('anglikonu siurkscios uzrasineti');
      chai.expect(Voca.latinise('Schuß für Pfarrerstöchter')).to.be.equal('Schus fur Pfarrerstochter');
      chai.expect(Voca.latinise('publicó éxito nació María')).to.be.equal('publico exito nacio Maria');
      chai.expect(Voca.latinise('Charlotte Brontë')).to.be.equal('Charlotte Bronte');
      chai.expect(Voca.latinise('vecākā no māsām Brontē')).to.be.equal('vecaka no masam Bronte');
      chai.expect(Voca.latinise('Şarlotta Brontenin özü')).to.be.equal('Sarlotta Brontenin ozu');
      chai.expect(Voca.latinise('Wkrótce po ślubie pisarka zaszła w ciążę')).to.be.equal('Wkrotce po slubie pisarka zaszla w ciaze');
      chai.expect(Voca.latinise("Dès l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencée par certaines sources d'inspiration")).to.be.equal("Des l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencee par certaines sources d'inspiration");
      chai.expect(Voca.latinise('Există peste 13.800 de localități în România')).to.be.equal('Exista peste 13.800 de localitati in Romania');
      chai.expect(Voca.latinise('août décembre')).to.be.equal('aout decembre');
      chai.expect(Voca.latinise('Україна розташована в південно-східній частині Європи')).to.be.equal('Ukrayina roztashovana v pivdenno-shidnij chastini Yevropi');
      chai.expect(Voca.latinise('\t\n')).to.be.equal('\t\n');
      chai.expect(Voca.latinise('⁇')).to.be.equal('⁇');
      chai.expect(Voca.latinise(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    });

    it('should latinise a string representation of an object', function () {
      chai.expect(Voca.latinise(['María'])).to.be.equal('Maria');
      chai.expect(Voca.latinise({
        toString: function toString() {
          return 'sacó';
        }
      })).to.be.equal('saco');
    });

    it('should not modify numbers', function () {
      chai.expect(Voca.latinise(100)).to.be.equal('100');
      chai.expect(Voca.latinise(812)).to.be.equal('812');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.latinise()).to.be.equal('');
      chai.expect(Voca.latinise(undefined)).to.be.equal('');
      chai.expect(Voca.latinise(null)).to.be.equal('');
    });
  });

  describe('repeat', function () {

    it('should repeat a string', function () {
      chai.expect(Voca.repeat('paradise', 2)).to.be.equal('paradiseparadise');
      chai.expect(Voca.repeat('w', 3)).to.be.equal('www');
      chai.expect(Voca.repeat('the world is yours', 1)).to.be.equal('the world is yours');
      chai.expect(Voca.repeat('', 10)).to.be.equal('');
      chai.expect(Voca.repeat(PRINTABLE_ASCII, 2)).to.be.equal(PRINTABLE_ASCII + PRINTABLE_ASCII);
    });

    it('should return an empty string for 0 repeat times', function () {
      chai.expect(Voca.repeat('the world is yours', 0)).to.be.equal('');
      chai.expect(Voca.repeat('', 0)).to.be.equal('');
    });

    it('should return the same string when the number of times is null or undefined', function () {
      chai.expect(Voca.repeat('the world is yours')).to.be.equal('the world is yours');
      chai.expect(Voca.repeat('the world is yours', null)).to.be.equal('the world is yours');
      chai.expect(Voca.repeat('the world is yours', undefined)).to.be.equal('the world is yours');
    });

    it('should repeat a number', function () {
      chai.expect(Voca.repeat(123, 2)).to.be.equal('123123');
      chai.expect(Voca.repeat(0, 5)).to.be.equal('00000');
      chai.expect(Voca.repeat(-1.5, 2)).to.be.equal('-1.5-1.5');
    });

    it('should repeat a string representation of an object', function () {
      chai.expect(Voca.repeat(['paradise'], 2)).to.be.equal('paradiseparadise');
      chai.expect(Voca.repeat({
        toString: function toString() {
          return 'Tony';
        }
      }, 2)).to.be.equal('TonyTony');
    });

    it('should return an empty string for null or undefined string to be repeated', function () {
      chai.expect(Voca.repeat()).to.be.equal('');
      chai.expect(Voca.repeat(null)).to.be.equal('');
      chai.expect(Voca.repeat(undefined)).to.be.equal('');
      chai.expect(Voca.repeat(undefined, 10)).to.be.equal('');
    });
  });

  describe('pad', function () {

    it('should pad a string', function () {
      chai.expect(Voca.pad('FF', 4, '0')).to.be.equal('0FF0');
      chai.expect(Voca.pad('00FF', 4, '0')).to.be.equal('00FF');
      chai.expect(Voca.pad('ab', 10, '012')).to.be.equal('0120ab0120');
      chai.expect(Voca.pad('0', 5, '0')).to.be.equal('00000');
      chai.expect(Voca.pad('', 10, '01')).to.be.equal('0101001010');
      chai.expect(Voca.pad('Hello World')).to.be.equal('Hello World');
      chai.expect(Voca.pad('Hello World', 20, '')).to.be.equal('Hello World');
      chai.expect(Voca.pad('Welcome', 10)).to.be.equal(' Welcome  ');
      chai.expect(Voca.pad('Alien', 10, '-=')).to.be.equal('-=Alien-=-');
      chai.expect(Voca.pad(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
      chai.expect(Voca.pad(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal('-' + PRINTABLE_ASCII + '--');
      chai.expect(Voca.pad('')).to.be.equal('');
      chai.expect(Voca.pad('', 0)).to.be.equal('');
    });

    it('should not modify the string when pad length is less than string length', function () {
      chai.expect(Voca.pad('Hello World', 0, ' ')).to.be.equal('Hello World');
      chai.expect(Voca.pad('Hello World', 5, ' ')).to.be.equal('Hello World');
      chai.expect(Voca.pad('0', 0, ' ')).to.be.equal('0');
      chai.expect(Voca.pad('123', -1, ' ')).to.be.equal('123');
    });

    it('should pad a string representation of an object', function () {
      chai.expect(Voca.pad(['Welcome'], 9)).to.be.equal(' Welcome ');
      chai.expect(Voca.pad({
        toString: function toString() {
          return 'great';
        }
      }, 10, '-')).to.be.equal('--great---');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.pad()).to.be.equal('');
      chai.expect(Voca.pad(undefined)).to.be.equal('');
      chai.expect(Voca.pad(null)).to.be.equal('');
    });
  });

  describe('padLeft', function () {

    it('should left pad a string', function () {
      chai.expect(Voca.padLeft('FF', 4, '0')).to.be.equal('00FF');
      chai.expect(Voca.padLeft('00FF', 4, '0')).to.be.equal('00FF');
      chai.expect(Voca.padLeft('ab', 10, '012')).to.be.equal('01201201ab');
      chai.expect(Voca.padLeft('0', 5, '0')).to.be.equal('00000');
      chai.expect(Voca.padLeft('', 10, '01')).to.be.equal('0101010101');
      chai.expect(Voca.padLeft('Hello World')).to.be.equal('Hello World');
      chai.expect(Voca.padLeft('Hello World', 20, '')).to.be.equal('Hello World');
      chai.expect(Voca.padLeft('Welcome', 10)).to.be.equal('   Welcome');
      chai.expect(Voca.padLeft('Alien', 10, '-=')).to.be.equal('-=-=-Alien');
      chai.expect(Voca.padLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
      chai.expect(Voca.padLeft(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal('---' + PRINTABLE_ASCII);
      chai.expect(Voca.padLeft('')).to.be.equal('');
      chai.expect(Voca.padLeft('', 0)).to.be.equal('');
    });

    it('should not modify the string when pad length is less than string length', function () {
      chai.expect(Voca.padLeft('Hello World', 0, ' ')).to.be.equal('Hello World');
      chai.expect(Voca.padLeft('Hello World', 5, ' ')).to.be.equal('Hello World');
      chai.expect(Voca.padLeft('0', 0, ' ')).to.be.equal('0');
      chai.expect(Voca.padLeft('123', -1, ' ')).to.be.equal('123');
    });

    it('should left pad a string representation of an object', function () {
      chai.expect(Voca.padLeft(['Welcome'], 9)).to.be.equal('  Welcome');
      chai.expect(Voca.padLeft({
        toString: function toString() {
          return 'great';
        }
      }, 10, '-')).to.be.equal('-----great');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.padLeft()).to.be.equal('');
      chai.expect(Voca.padLeft(undefined)).to.be.equal('');
      chai.expect(Voca.padLeft(null)).to.be.equal('');
    });
  });

  describe('padRight', function () {

    it('should right pad a string', function () {
      chai.expect(Voca.padRight('FF', 4, '0')).to.be.equal('FF00');
      chai.expect(Voca.padRight('00FF', 4, '0')).to.be.equal('00FF');
      chai.expect(Voca.padRight('ab', 10, '012')).to.be.equal('ab01201201');
      chai.expect(Voca.padRight('0', 5, '0')).to.be.equal('00000');
      chai.expect(Voca.padRight('', 10, '01')).to.be.equal('0101010101');
      chai.expect(Voca.padRight('Hello World')).to.be.equal('Hello World');
      chai.expect(Voca.padRight('Hello World', 20, '')).to.be.equal('Hello World');
      chai.expect(Voca.padRight('Welcome', 10)).to.be.equal('Welcome   ');
      chai.expect(Voca.padRight('123', 6, '_-')).to.be.equal('123_-_');
      chai.expect(Voca.padRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
      chai.expect(Voca.padRight(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal(PRINTABLE_ASCII + '---');
      chai.expect(Voca.padRight('')).to.be.equal('');
      chai.expect(Voca.padRight('', 0)).to.be.equal('');
    });

    it('should not modify the string when pad length is less than string length', function () {
      chai.expect(Voca.padRight('Hello World', 0, ' ')).to.be.equal('Hello World');
      chai.expect(Voca.padRight('Hello World', 5, ' ')).to.be.equal('Hello World');
      chai.expect(Voca.padRight('0', 0, ' ')).to.be.equal('0');
      chai.expect(Voca.padRight('123', -1, ' ')).to.be.equal('123');
    });

    it('should right pad a string representation of an object', function () {
      chai.expect(Voca.padRight(['Welcome'], 9)).to.be.equal('Welcome  ');
      chai.expect(Voca.padRight({
        toString: function toString() {
          return 'great';
        }
      }, 10, '-')).to.be.equal('great-----');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.padRight()).to.be.equal('');
      chai.expect(Voca.padRight(undefined)).to.be.equal('');
      chai.expect(Voca.padRight(null)).to.be.equal('');
    });
  });

  describe('replace', function () {

    it('should return the replace result with a string pattern', function () {
      chai.expect(Voca.replace('duck', 'duck', 'swan')).to.be.equal('swan');
      chai.expect(Voca.replace('duck', 'duck', '')).to.be.equal('');
      chai.expect(Voca.replace('duck', 'd', '')).to.be.equal('uck');
      chai.expect(Voca.replace('duck', 'u', function () {
        return 'a';
      })).to.be.equal('dack');
      chai.expect(Voca.replace('', '', '')).to.be.equal('');
      chai.expect(Voca.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
      chai.expect(Voca.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).to.be.equal('duck');
    });

    it('should return the replace result with a RegExp pattern', function () {
      chai.expect(Voca.replace('duck', /duck/, 'swan')).to.be.equal('swan');
      chai.expect(Voca.replace('duck', /duck/, '')).to.be.equal('');
      chai.expect(Voca.replace('duck', /d/, '')).to.be.equal('uck');
      chai.expect(Voca.replace('duck', /u/, function () {
        return 'a';
      })).to.be.equal('dack');
      chai.expect(Voca.replace('hello world', /(hello)\s(world)/, function (match, hello, world) {
        return world + ', ' + hello;
      })).to.be.equal('world, hello');
    });

    it('should return the replace result from a string representation of an object', function () {
      chai.expect(Voca.replace(['duck'], 'duck', 'swan')).to.be.equal('swan');
      chai.expect(Voca.replace({
        toString: function toString() {
          return 'mandarin duck';
        }
      }, /mandarin\s/, '')).to.be.equal('duck');
    });

    it('should return the replace result from a number', function () {
      chai.expect(Voca.replace(1500, '0', '1')).to.be.equal('1510');
      chai.expect(Voca.replace(6475, /\d/g, '*')).to.be.equal('****');
    });

    it('should return the an empty string for an undefined or null', function () {
      chai.expect(Voca.replace(undefined, /./, '1')).to.be.equal('');
      chai.expect(Voca.replace(null, /./, '1')).to.be.equal('');
    });
  });

  describe('replaceAll', function () {

    it('should return the replace result with a string pattern', function () {
      chai.expect(Voca.replaceAll('duck', 'duck', 'swan')).to.be.equal('swan');
      chai.expect(Voca.replaceAll('duck duck', 'duck', 'swan')).to.be.equal('swan swan');
      chai.expect(Voca.replaceAll('duck', 'duck', '')).to.be.equal('');
      chai.expect(Voca.replaceAll('dduucckk', 'd', 'dd')).to.be.equal('dddduucckk');
      chai.expect(Voca.replaceAll('duck', 'd', '')).to.be.equal('uck');
      chai.expect(Voca.replaceAll('duck duck duc', 'duck', function () {
        return 'swan';
      })).to.be.equal('swan swan duc');
      chai.expect(Voca.replaceAll('duck', 'u', function () {
        return 'a';
      })).to.be.equal('dack');
      chai.expect(Voca.replaceAll('[a-b] [a-c][a-b]', '[a-b]', '[ab]')).to.be.equal('[ab] [a-c][ab]');
      chai.expect(Voca.replaceAll('*.*.', '*.', '*')).to.be.equal('**');
      chai.expect(Voca.replaceAll('a a b a', 'a', 'b')).to.be.equal('b b b b');
      chai.expect(Voca.replaceAll('', '', '')).to.be.equal('');
      chai.expect(Voca.replaceAll('duck', '', '')).to.be.equal('duck');
      chai.expect(Voca.replaceAll(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
      chai.expect(Voca.replaceAll(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).to.be.equal('duck');
    });

    it('should return the replace result with a RegExp pattern', function () {
      chai.expect(Voca.replaceAll('duck duck', /duck/, 'swan')).to.be.equal('swan swan');
      chai.expect(Voca.replaceAll('duck DUCK', /duck/, 'swan')).to.be.equal('swan DUCK');
      chai.expect(Voca.replaceAll('duck DUCK', /DUCK/i, 'swan')).to.be.equal('swan swan');
      chai.expect(Voca.replaceAll('duck', /duck/, '')).to.be.equal('');
      chai.expect(Voca.replaceAll('duck', /d/, '')).to.be.equal('uck');
      chai.expect(Voca.replaceAll('duck duck', /u/, function () {
        return 'a';
      })).to.be.equal('dack dack');
      chai.expect(Voca.replaceAll('hello world', /(hello)\s(world)/, function (match, hello, world) {
        return world + ', ' + hello;
      })).to.be.equal('world, hello');
    });

    it('should return the replace result from a string representation of an object', function () {
      chai.expect(Voca.replaceAll(['duck'], 'duck', 'swan')).to.be.equal('swan');
      chai.expect(Voca.replaceAll({
        toString: function toString() {
          return 'mandarin duck';
        }
      }, /mandarin\s/, '')).to.be.equal('duck');
    });

    it('should return the replace result from a number', function () {
      chai.expect(Voca.replaceAll(1500, '0', '1')).to.be.equal('1511');
      chai.expect(Voca.replaceAll(6475, /\d/g, '*')).to.be.equal('****');
      chai.expect(Voca.replaceAll(6475, /\d/, '*')).to.be.equal('****');
    });

    it('should return the original string on failed match', function () {
      chai.expect(Voca.replaceAll('duck', 'dack', 'swan')).to.be.equal('duck');
      chai.expect(Voca.replaceAll('duck', /dack/, '')).to.be.equal('duck');
    });

    it('should return the an empty string for an undefined or null', function () {
      chai.expect(Voca.replaceAll(undefined, /./, '1')).to.be.equal('');
      chai.expect(Voca.replaceAll(null, /./, '1')).to.be.equal('');
    });
  });

  describe('reverse', function () {

    it('should reverse a string', function () {
      chai.expect(Voca.reverse('green tree')).to.be.equal('eert neerg');
      chai.expect(Voca.reverse('o')).to.be.equal('o');
      chai.expect(Voca.reverse('\n\t')).to.be.equal('\t\n');
      chai.expect(Voca.reverse('')).to.be.equal('');
      chai.expect(Voca.reverse(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
    });

    it('should reverse a number', function () {
      chai.expect(Voca.reverse(123)).to.be.equal('321');
      chai.expect(Voca.reverse(0)).to.be.equal('0');
      chai.expect(Voca.reverse(-1.5)).to.be.equal('5.1-');
    });

    it('should reverse a string representation of an object', function () {
      chai.expect(Voca.reverse(['flower'])).to.be.equal('rewolf');
      chai.expect(Voca.reverse({
        toString: function toString() {
          return 'flower';
        }
      })).to.be.equal('rewolf');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.reverse()).to.be.equal('');
      chai.expect(Voca.reverse(null)).to.be.equal('');
      chai.expect(Voca.reverse(undefined)).to.be.equal('');
    });
  });

  describe('reverseGrapheme', function () {

    it('should reverse a string', function () {
      chai.expect(Voca.reverseGrapheme('green tree')).to.be.equal('eert neerg');
      chai.expect(Voca.reverseGrapheme('ma\xF1ana')).to.be.equal('ana\xF1am');
      chai.expect(Voca.reverseGrapheme('mañana')).to.be.equal('anañam');
      chai.expect(Voca.reverseGrapheme('foõ͜͝͞bar')).to.be.equal('rabõ͜͝͞of');
      chai.expect(Voca.reverseGrapheme('foo𝌆̃͜͝͞bar')).to.be.equal('rab𝌆̃͜͝͞oof');
      chai.expect(Voca.reverseGrapheme('o')).to.be.equal('o');
      chai.expect(Voca.reverseGrapheme('\n\t')).to.be.equal('\t\n');
      chai.expect(Voca.reverseGrapheme('')).to.be.equal('');
      chai.expect(Voca.reverseGrapheme(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
    });

    it('should reverseCodePoint a number', function () {
      chai.expect(Voca.reverseGrapheme(123)).to.be.equal('321');
      chai.expect(Voca.reverseGrapheme(0)).to.be.equal('0');
      chai.expect(Voca.reverseGrapheme(-1.5)).to.be.equal('5.1-');
    });

    it('should reverseCodePoint a string representation of an object', function () {
      chai.expect(Voca.reverseGrapheme(['flower'])).to.be.equal('rewolf');
      chai.expect(Voca.reverseGrapheme({
        toString: function toString() {
          return 'flower';
        }
      })).to.be.equal('rewolf');
    });

    it('should return an empty string for null or undefined', function () {
      chai.expect(Voca.reverseGrapheme()).to.be.equal('');
      chai.expect(Voca.reverseGrapheme(null)).to.be.equal('');
      chai.expect(Voca.reverseGrapheme(undefined)).to.be.equal('');
    });
  });

  describe('slugify', function () {

    it('should slugify the string', function () {
      chai.expect(Voca.slugify('bird')).to.be.equal('bird');
      chai.expect(Voca.slugify('BIRD')).to.be.equal('bird');
      chai.expect(Voca.slugify('BirdFlight')).to.be.equal('bird-flight');
      chai.expect(Voca.slugify('bird flight')).to.be.equal('bird-flight');
      chai.expect(Voca.slugify('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
      chai.expect(Voca.slugify('-BIRD-FLIGHT-')).to.be.equal('bird-flight');
      chai.expect(Voca.slugify('__BIRD___FLIGHT___')).to.be.equal('bird-flight');
      chai.expect(Voca.slugify('Restless flycatcher')).to.be.equal('restless-flycatcher');
      chai.expect(Voca.slugify('XMLHttpRequest')).to.be.equal('xml-http-request');
      chai.expect(Voca.slugify('weight of up to 12 kg')).to.be.equal('weight-of-up-to-12-kg');
      chai.expect(Voca.slugify('/home/dmitri/projects/voca')).to.be.equal('home-dmitri-projects-voca');
      chai.expect(Voca.slugify(PRINTABLE_ASCII)).to.be.equal('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
      chai.expect(Voca.slugify('****')).to.be.equal('');
      chai.expect(Voca.slugify('****')).to.be.equal('');
      chai.expect(Voca.slugify('-----')).to.be.equal('');
      chai.expect(Voca.slugify('     ')).to.be.equal('');
      chai.expect(Voca.slugify('\n\n\n\n   ***\t\t')).to.be.equal('');
      chai.expect(Voca.slugify('')).to.be.equal('');
    });

    it('should slugify the string of a non-latin string', function () {
      chai.expect(Voca.slugify('zborul păsării')).to.be.equal('zborul-pasarii');
      chai.expect(Voca.slugify('fuerza de sustentación')).to.be.equal('fuerza-de-sustentacion');
      chai.expect(Voca.slugify('skrzydło ptaka składa się')).to.be.equal('skrzydlo-ptaka-sklada-sie');
      chai.expect(Voca.slugify('Україна розташована в південно-східній частині Європи')).to.be.equal('ukrayina-roztashovana-v-pivdenno-shidnij-chastini-yevropi');
      chai.expect(Voca.slugify('mañana')).to.be.equal('manana');
      chai.expect(Voca.slugify('foõ͜͝͞ bar')).to.be.equal('foo-bar');
    });

    it('should not modify numbers', function () {
      chai.expect(Voca.slugify(0)).to.be.equal('0');
      chai.expect(Voca.slugify(1200)).to.be.equal('1200');
      chai.expect(Voca.slugify('8965')).to.be.equal('8965');
    });

    it('should slugify the string representation of an object', function () {
      chai.expect(Voca.slugify(['bird flight'])).to.be.equal('bird-flight');
      chai.expect(Voca.slugify({
        toString: function toString() {
          return 'bird flight';
        }
      })).to.be.equal('bird-flight');
    });

    it('should return empty string for null or undefined', function () {
      chai.expect(Voca.slugify()).to.be.equal('');
      chai.expect(Voca.slugify(undefined)).to.be.equal('');
      chai.expect(Voca.slugify(null)).to.be.equal('');
    });
  });

  describe('trim', function () {

    it('should return the trimmed string with default whitespaces', function () {
      chai.expect(Voca.trim(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trim('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trim('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trim('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trim('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trim('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trim('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trim(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
    });

    it('should return the trimmed string with custom whitespaces', function () {
      chai.expect(Voca.trim('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?');
      chai.expect(Voca.trim('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?');
      chai.expect(Voca.trim('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
      chai.expect(Voca.trim('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
      chai.expect(Voca.trim('***Do you *feel* in charge?***', '**')).to.be.equal('*Do you *feel* in charge?*');
      chai.expect(Voca.trim('Do you *feel* in charge?', 'Do you *feel* in charge?')).to.be.equal('');
      chai.expect(Voca.trim('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
    });

    it('should not modify the string for an empty string whitespace', function () {
      chai.expect(Voca.trim('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
      chai.expect(Voca.trim('', '')).to.be.equal('');
    });

    it('should return the trimmed string representation of an object', function () {
      chai.expect(Voca.trim([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trim({
        toString: function toString() {
          return '\n\nYes. The fire rises.';
        }
      })).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trim(['****You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
    });

    it('should return the trimmed string for numbers', function () {
      chai.expect(Voca.trim(100, 1)).to.be.equal('00');
      chai.expect(Voca.trim(6780, 6780)).to.be.equal('');
      chai.expect(Voca.trim(-115, -1)).to.be.equal('15');
      chai.expect(Voca.trim(1111, 1)).to.be.equal('');
      chai.expect(Voca.trim(8998, 8)).to.be.equal('99');
    });

    it('should return empty string for null or undefined', function () {
      chai.expect(Voca.trim(null)).to.be.equal('');
      chai.expect(Voca.trim(null, '\n')).to.be.equal('');
      chai.expect(Voca.trim(null, null)).to.be.equal('');
      chai.expect(Voca.trim(undefined)).to.be.equal('');
      chai.expect(Voca.trim(undefined, '*')).to.be.equal('');
      chai.expect(Voca.trim(undefined, undefined)).to.be.equal('');
    });
  });

  describe('trimLeft', function () {

    it('should return the left trimmed string with default whitespaces', function () {
      chai.expect(Voca.trimLeft(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimLeft('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimLeft('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.    ');
      chai.expect(Voca.trimLeft('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimLeft('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimLeft('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimLeft('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
    });

    it('should return the left trimmed string with custom whitespaces', function () {
      chai.expect(Voca.trimLeft('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?-');
      chai.expect(Voca.trimLeft('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?---');
      chai.expect(Voca.trimLeft('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?___');
      chai.expect(Voca.trimLeft('___Do you *feel* in charge?', '_')).to.be.equal('Do you *feel* in charge?');
      chai.expect(Voca.trimLeft('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
      chai.expect(Voca.trimLeft('***Do you *feel* in charge?***', '**')).to.be.equal('*Do you *feel* in charge?***');
      chai.expect(Voca.trimLeft('Do you *feel* in charge?', 'Do you *feel* in charge?')).to.be.equal('');
      chai.expect(Voca.trimLeft('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
    });

    it('should not modify the string for an empty string whitespace', function () {
      chai.expect(Voca.trimLeft('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
      chai.expect(Voca.trimLeft('', '')).to.be.equal('');
    });

    it('should return the left trimmed string representation of an object', function () {
      chai.expect(Voca.trimLeft([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimLeft({
        toString: function toString() {
          return '\n\nYes. The fire rises.';
        }
      })).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimLeft(['****You\'re a big guy!'], ['*'])).to.be.equal('You\'re a big guy!');
    });

    it('should return the left trimmed string for numbers', function () {
      chai.expect(Voca.trimLeft(100, 1)).to.be.equal('00');
      chai.expect(Voca.trimLeft(6780, 6780)).to.be.equal('');
      chai.expect(Voca.trimLeft(-115, -1)).to.be.equal('15');
    });

    it('should return empty string for null or undefined', function () {
      chai.expect(Voca.trimLeft(null)).to.be.equal('');
      chai.expect(Voca.trimLeft(null, '\n')).to.be.equal('');
      chai.expect(Voca.trimLeft(null, null)).to.be.equal('');
      chai.expect(Voca.trimLeft(undefined)).to.be.equal('');
      chai.expect(Voca.trimLeft(undefined, '*')).to.be.equal('');
      chai.expect(Voca.trimLeft(undefined, undefined)).to.be.equal('');
    });
  });

  describe('trimRight', function () {

    it('should return the right trimmed string with default whitespaces', function () {
      chai.expect(Voca.trimRight('Yes. The fire rises. ')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimRight('Yes. The fire rises.   ')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimRight('   Yes. The fire rises.    ')).to.be.equal('   Yes. The fire rises.');
      chai.expect(Voca.trimRight('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimRight('Yes. The fire rises.\n\f\t ')).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimRight('Yes. The fire rises.\n\f\t ', null)).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimRight('Yes. The fire rises.\n\f\t ', undefined)).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    });

    it('should return the right trimmed string with custom whitespaces', function () {
      chai.expect(Voca.trimRight('-Do you *feel* in charge?-', '-')).to.be.equal('-Do you *feel* in charge?');
      chai.expect(Voca.trimRight('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('---Do-you-*feel*-in-charge?');
      chai.expect(Voca.trimRight('___Do you *feel* in charge?', '_')).to.be.equal('___Do you *feel* in charge?');
      chai.expect(Voca.trimRight('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
      chai.expect(Voca.trimRight('Do you *feel* in charge?<-', '<-')).to.be.equal('Do you *feel* in charge?');
      chai.expect(Voca.trimRight('***Do you *feel* in charge?***', '**')).to.be.equal('***Do you *feel* in charge?*');
      chai.expect(Voca.trimRight('Do you *feel* in charge?', 'Do you *feel* in charge?')).to.be.equal('');
      chai.expect(Voca.trimRight('Do you *feel* in charge?\n\n', '\n')).to.be.equal('Do you *feel* in charge?');
    });

    it('should not modify the string for an empty string whitespace', function () {
      chai.expect(Voca.trimRight('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
      chai.expect(Voca.trimRight('', '')).to.be.equal('');
    });

    it('should return the right trimmed string representation of an object', function () {
      chai.expect(Voca.trimRight(['Yes. The fire rises. '])).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimRight({
        toString: function toString() {
          return 'Yes. The fire rises.\n\n';
        }
      })).to.be.equal('Yes. The fire rises.');
      chai.expect(Voca.trimRight(['You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
    });

    it('should return the right trimmed string for numbers', function () {
      chai.expect(Voca.trimRight(100, 0)).to.be.equal('1');
      chai.expect(Voca.trimRight(6780, 6780)).to.be.equal('');
      chai.expect(Voca.trimRight(-115, 15)).to.be.equal('-1');
    });

    it('should return empty string for null or undefined', function () {
      chai.expect(Voca.trimRight(null)).to.be.equal('');
      chai.expect(Voca.trimRight(null, '\n')).to.be.equal('');
      chai.expect(Voca.trimRight(null, null)).to.be.equal('');
      chai.expect(Voca.trimRight(undefined)).to.be.equal('');
      chai.expect(Voca.trimRight(undefined, '*')).to.be.equal('');
      chai.expect(Voca.trimRight(undefined, undefined)).to.be.equal('');
    });
  });

  describe('endsWith', function () {

    it('should return true for valid ending string', function () {
      chai.expect(Voca.endsWith('Hello World!', '')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', '!')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'd!')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'rld!')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'orld!')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'World!')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', ' World!')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'o World!')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'lo World!')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'llo World!')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'ello World!')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hello World!')).to.be.true;
      chai.expect(Voca.endsWith('Привет Мир!', 'Мир!')).to.be.true;
      chai.expect(Voca.endsWith('', '')).to.be.true;
      chai.expect(Voca.endsWith(PRINTABLE_ASCII, '~')).to.be.true;
    });

    it('should return true for valid ending string and position', function () {
      chai.expect(Voca.endsWith('Hello World!', '', 'Hello World'.length)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hello World!', 'Hello World!'.length)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hello World', 'Hello World!'.length - 1)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hello Worl', 'Hello World!'.length - 2)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hello Wor', 'Hello World!'.length - 3)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hello Wo', 'Hello World!'.length - 4)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hello W', 'Hello World!'.length - 5)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hello ', 'Hello World!'.length - 6)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hello', 'Hello World!'.length - 7)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hell', 'Hello World!'.length - 8)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'Hel', 'Hello World!'.length - 9)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'He', 'Hello World!'.length - 10)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'H', 'Hello World!'.length - 11)).to.be.true;
      chai.expect(Voca.endsWith('', '', 0)).to.be.true;
    });

    it('should return true for a correct downcast of the position', function () {
      chai.expect(Voca.endsWith('Hello World!', 'ello', '5')).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'ello', 5.1)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'World!', 30000)).to.be.true;
      chai.expect(Voca.endsWith('Hello World!', 'World!', Infinity)).to.be.true;
    });

    it('should return true for an empty ending string', function () {
      [0, 1, 100, Infinity, undefined, NaN, null].forEach(function (position) {
        chai.expect(Voca.endsWith('Hello World!', '', position)).to.be.true;
      });
    });

    it('should return true for valid ending number', function () {
      chai.expect(Voca.endsWith(1000, 0)).to.be.true;
      chai.expect(Voca.endsWith(1250, 50)).to.be.true;
      chai.expect(Voca.endsWith('916', 16)).to.be.true;
    });

    it('should return true for a valid ending in a string representation of an object', function () {
      chai.expect(Voca.endsWith(['Welcome to Earth'], 'Earth')).to.be.true;
      chai.expect(Voca.endsWith({
        toString: function toString() {
          return 'Let us not stand on ceremony, Mr. Wayne.';
        }
      }, ['Mr. Wayne'], 'Let us not stand on ceremony, Mr. Wayne.'.length - 1)).to.be.true;
    });

    it('should return false for an invalid ending string', function () {
      chai.expect(Voca.endsWith('The shadows betray you, because they belong to me!', 'The shadows')).to.be.false;
      chai.expect(Voca.endsWith('The shadows betray you, because they belong to me!', 'to me')).to.be.false;
      chai.expect(Voca.endsWith('They belong to me!', 'They belong to me')).to.be.false;
      chai.expect(Voca.endsWith('They belong to me!', 'belong')).to.be.false;
      chai.expect(Voca.endsWith('', 'The shadows')).to.be.false;
    });

    it('should return false for an invalid ending string and position', function () {
      chai.expect(Voca.endsWith('The shadows betray you, because they belong to me!', 'they belong to me!', 5)).to.be.false;
      chai.expect(Voca.endsWith('They belong to me!', 'They belong to me!', 'They belong to me!'.length - 1)).to.be.false;
      chai.expect(Voca.endsWith('They belong to me!', 'They', 'They belong to me!'.length)).to.be.false;
      chai.expect(Voca.endsWith('They belong to me!', 'belong', 'They belong to me!'.length)).to.be.false;
      chai.expect(Voca.endsWith('They belong to me!', 'to me!', 0)).to.be.false;
      chai.expect(Voca.endsWith('They belong to me!', 'belong to me!', -100)).to.be.false;
    });

    it('should return false for an invalid ending number', function () {
      chai.expect(Voca.endsWith(1000, 10)).to.be.false;
      chai.expect(Voca.endsWith(1250, 55)).to.be.false;
      chai.expect(Voca.endsWith('916', 18)).to.be.false;
    });

    it('should return false for a NaN position', function () {
      chai.expect(Voca.endsWith('Hello World!', 'World!', NaN)).to.be.false;
    });

    it('should return false for undefined and null parameters', function () {
      chai.expect(Voca.endsWith()).to.be.false;
      chai.expect(Voca.endsWith(undefined)).to.be.false;
      chai.expect(Voca.endsWith(undefined, undefined)).to.be.false;
      chai.expect(Voca.endsWith(undefined, undefined, undefined)).to.be.false;
      chai.expect(Voca.endsWith(undefined, undefined, 0)).to.be.false;
      chai.expect(Voca.endsWith(undefined, 'Hello World!')).to.be.false;
      chai.expect(Voca.endsWith(null)).to.be.false;
      chai.expect(Voca.endsWith(null, null)).to.be.false;
      chai.expect(Voca.endsWith(null, null, null)).to.be.false;
      chai.expect(Voca.endsWith(null, null, 0)).to.be.false;
      chai.expect(Voca.endsWith(null, 'Hello World!')).to.be.false;
    });
  });

  describe('includes', function () {

    it('should return true for an included string', function () {
      chai.expect(Voca.includes('mobile infantry', 'mobile')).to.be.true;
      chai.expect(Voca.includes('mobile infantry', 'infantry')).to.be.true;
      chai.expect(Voca.includes('mobile infantry', 'mobile infantry')).to.be.true;
      chai.expect(Voca.includes('mobile infantry', ' ')).to.be.true;
      chai.expect(Voca.includes('mobile infantry', '')).to.be.true;
      chai.expect(Voca.includes('', '')).to.be.true;
      chai.expect(Voca.includes(undefined, '')).to.be.true;
      chai.expect(Voca.includes('\nwelcome', '\n')).to.be.true;
      chai.expect(Voca.includes(PRINTABLE_ASCII, '+')).to.be.true;
    });

    it('should return true for an included string and position', function () {
      chai.expect(Voca.includes('mobile infantry', 'mobile', 0)).to.be.true;
      chai.expect(Voca.includes('mobile infantry', 'infantry', 7)).to.be.true;
      chai.expect(Voca.includes('mobile infantry', 'mobile infantry', 0)).to.be.true;
      chai.expect(Voca.includes('mobile infantry', ' ', 6)).to.be.true;
      chai.expect(Voca.includes('mobile infantry', '', 0)).to.be.true;
      chai.expect(Voca.includes('mobile infantry', '', 6)).to.be.true;
      chai.expect(Voca.includes('', '', 0)).to.be.true;
      chai.expect(Voca.includes('', '', 6)).to.be.true;
    });

    it('should return true for an included string representation of an object', function () {
      chai.expect(Voca.includes(['mobile infantry'], 'mobile')).to.be.true;
      chai.expect(Voca.includes({
        toString: function toString() {
          return 'mobile infantry';
        }
      }, 'infantry')).to.be.true;
      chai.expect(Voca.includes(['mobile infantry'], ['mobile infantry'])).to.be.true;
    });

    it('should return true for an included number', function () {
      chai.expect(Voca.includes(155, 55));
      chai.expect(Voca.includes('1078', 78));
      chai.expect(Voca.includes(0, 0));
      chai.expect(Voca.includes(80, ''));
    });

    it('should return false for a not included string', function () {
      chai.expect(Voca.includes('mobile infantry', 'be mobile')).to.be.false;
      chai.expect(Voca.includes('mobile infantry', 'infantry ')).to.be.false;
      chai.expect(Voca.includes('mobile infantry', ' mobile infantry ')).to.be.false;
      chai.expect(Voca.includes('mobile infantry', '!')).to.be.false;
      chai.expect(Voca.includes('', 'mobile')).to.be.false;
      chai.expect(Voca.includes('\nwelcome', '\t')).to.be.false;
    });

    it('should return false for a not included string and position', function () {
      chai.expect(Voca.includes('mobile infantry', 'mobile', 1)).to.be.false;
      chai.expect(Voca.includes('mobile infantry', 'infantry', 8)).to.be.false;
      chai.expect(Voca.includes('mobile infantry', 'mobile infantry', 2)).to.be.false;
      chai.expect(Voca.includes('mobile infantry', ' ', 7)).to.be.false;
    });

    it('should return false for a not included string representation of an object', function () {
      chai.expect(Voca.includes(['mobile infantry'], 'mobile number')).to.be.false;
      chai.expect(Voca.includes({
        toString: function toString() {
          return 'mobile infantry';
        }
      }, 'motorized infantry')).to.be.false;
      chai.expect(Voca.includes(['mobile infantry'], ['mobile infantry'], 1)).to.be.false;
    });

    it('should return false for a undefined or null search string', function () {
      chai.expect(Voca.includes('mobile infantry', undefined)).to.be.false;
      chai.expect(Voca.includes('mobile infantry', null)).to.be.false;
    });
  });

  describe('isAlpha', function () {

    it('should return true for an alpha string', function () {
      chai.expect(Voca.isAlpha('HelloWorld')).to.be.true;
      chai.expect(Voca.isAlpha('JavaScript')).to.be.true;
      chai.expect(Voca.isAlpha('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
      chai.expect(Voca.isAlpha('mañana')).to.be.true;
      chai.expect(Voca.isAlpha('foõ͜͝͞bar')).to.be.true;
    });

    it('should return true for an alpha russian string', function () {
      chai.expect(Voca.isAlpha('ПриветМир')).to.be.true;
      chai.expect(Voca.isAlpha('ЯваСкрипт')).to.be.true;
      chai.expect(Voca.isAlpha('АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя')).to.be.true;
    });

    it('should return true for an alpha japanese string', function () {
      chai.expect(Voca.isAlpha('こんにちは世界')).to.be.true;
      chai.expect(Voca.isAlpha('ジャバスクリプト')).to.be.true;
    });

    it('should return true for a string with diacritics', function () {
      chai.expect(Voca.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
    });

    it('should return true for characters with diacritical marks', function () {
      chai.expect(Voca.isAlpha('mañana')).to.be.true;
      chai.expect(Voca.isAlpha('foõ͜͝͞bar')).to.be.true;
    });

    it('should return true for an array with one alpha string item', function () {
      chai.expect(Voca.isAlpha(['HelloWorld'])).to.be.true;
      chai.expect(Voca.isAlpha(['ПриветМир'])).to.be.true;
    });

    it('should return true for an alpha string representation of an object', function () {
      chai.expect(Voca.isAlpha({
        toString: function toString() {
          return 'HelloWorld';
        }
      })).to.be.true;
      chai.expect(Voca.isAlpha({
        toString: function toString() {
          return 'ПриветМир';
        }
      })).to.be.true;
    });

    it('should return true for a boolean', function () {
      chai.expect(Voca.isAlpha(true)).to.be.true;
      chai.expect(Voca.isAlpha(false)).to.be.true;
    });

    it('should return true for a NaN or Infinity number', function () {
      chai.expect(Voca.isAlpha(NaN)).to.be.true;
      chai.expect(Voca.isAlpha(Infinity)).to.be.true;
    });

    it('should return false for a non-alpha string', function () {
      chai.expect(Voca.isAlpha('Hello World!')).to.be.false;
      chai.expect(Voca.isAlpha('\nHello World!\n')).to.be.false;
      chai.expect(Voca.isAlpha('ECMAScript 5.1 (ECMA-262)')).to.be.false;
      chai.expect(Voca.isAlpha(' ')).to.be.false;
      chai.expect(Voca.isAlpha('\n')).to.be.false;
      chai.expect(Voca.isAlpha('\t')).to.be.false;
      chai.expect(Voca.isAlpha('0123456789')).to.be.false;
      chai.expect(Voca.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ 0123456789')).to.be.false;
      chai.expect(Voca.isAlpha(PRINTABLE_ASCII)).to.be.false;
    });

    it('should return false for a non-alpha russian string', function () {
      chai.expect(Voca.isAlpha('Привет Мир!')).to.be.false;
      chai.expect(Voca.isAlpha('\nПривет Мир!\n')).to.be.false;
      chai.expect(Voca.isAlpha('ECMAScript версии 5.1 (ECMA-262)')).to.be.false;
    });

    it('should return false for a non-alpha japanese string', function () {
      chai.expect(Voca.isAlpha('こんにちは世界!')).to.be.false;
      chai.expect(Voca.isAlpha('ジャバスクリプト2015')).to.be.false;
    });

    it('should return false for an array with a non-alpha string item', function () {
      chai.expect(Voca.isAlpha(['Hello World!'])).to.be.false;
      chai.expect(Voca.isAlpha(['Привет Мир!'])).to.be.false;
    });

    it('should return false for a non-alpha string representation of an object', function () {
      chai.expect(Voca.isAlpha({
        toString: function toString() {
          return 'Hello World!';
        }
      })).to.be.false;
      chai.expect(Voca.isAlpha({
        toString: function toString() {
          return 'Привет Мир!';
        }
      })).to.be.false;
    });

    it('should return false for an undefined', function () {
      chai.expect(Voca.isAlpha(undefined)).to.be.false;
      chai.expect(Voca.isAlpha()).to.be.false;
    });

    it('should return false for a null', function () {
      chai.expect(Voca.isAlpha(null)).to.be.false;
    });

    it('should return false for a number or numeric string', function () {
      chai.expect(Voca.isAlpha(0)).to.be.false;
      chai.expect(Voca.isAlpha(10)).to.be.false;
      chai.expect(Voca.isAlpha(-12.05)).to.be.false;
      chai.expect(Voca.isAlpha(0xFF)).to.be.false;
      chai.expect(Voca.isAlpha('0')).to.be.false;
      chai.expect(Voca.isAlpha('10')).to.be.false;
      chai.expect(Voca.isAlpha('-12.05')).to.be.false;
      chai.expect(Voca.isAlpha('0xFF')).to.be.false;
    });

    it('should return false for an empty string', function () {
      chai.expect(Voca.isAlpha('')).to.be.false;
    });
  });

  describe('isAlphaDigit', function () {

    it('should return true for an alpha and digit string', function () {
      chai.expect(Voca.isAlphaDigit('HelloWorld')).to.be.true;
      chai.expect(Voca.isAlphaDigit('HelloWorld007')).to.be.true;
      chai.expect(Voca.isAlphaDigit('JavaScript6')).to.be.true;
      chai.expect(Voca.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
      chai.expect(Voca.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789')).to.be.true;
      chai.expect(Voca.isAlphaDigit('mañana')).to.be.true;
      chai.expect(Voca.isAlphaDigit('foõ͜͝͞bar')).to.be.true;
    });

    it('should return true for an alpha and digit russian string', function () {
      chai.expect(Voca.isAlphaDigit('ПриветМир')).to.be.true;
      chai.expect(Voca.isAlphaDigit('ПриветМир007')).to.be.true;
      chai.expect(Voca.isAlphaDigit('ЯваСкрипт6')).to.be.true;
      chai.expect(Voca.isAlphaDigit('АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя')).to.be.true;
      chai.expect(Voca.isAlphaDigit('АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя0123456789')).to.be.true;
    });

    it('should return true for an alpha and digit japanese string', function () {
      chai.expect(Voca.isAlphaDigit('こんにちは世界')).to.be.true;
      chai.expect(Voca.isAlphaDigit('こんにちは世界45')).to.be.true;
      chai.expect(Voca.isAlphaDigit('12ジャバスクリプト')).to.be.true;
    });

    it('should return true for a string with diacritics', function () {
      chai.expect(Voca.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
      chai.expect(Voca.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ0123456789')).to.be.true;
    });

    it('should return true for an array with one alpha and digit string item', function () {
      chai.expect(Voca.isAlphaDigit(['HelloWorld'])).to.be.true;
      chai.expect(Voca.isAlphaDigit(['HelloWorld007'])).to.be.true;
      chai.expect(Voca.isAlphaDigit(['ЯваСкрипт6'])).to.be.true;
    });

    it('should return true for an alpha and digit string representation of an object', function () {
      chai.expect(Voca.isAlphaDigit({
        toString: function toString() {
          return 'HelloWorld';
        }
      })).to.be.true;
      chai.expect(Voca.isAlphaDigit({
        toString: function toString() {
          return 'ПриветМир';
        }
      })).to.be.true;
      chai.expect(Voca.isAlphaDigit({
        toString: function toString() {
          return 'JavaScript2016';
        }
      })).to.be.true;
      chai.expect(Voca.isAlphaDigit({
        toString: function toString() {
          return 'ЯваСкрипт2016';
        }
      })).to.be.true;
    });

    it('should return true for a boolean', function () {
      chai.expect(Voca.isAlphaDigit(true)).to.be.true;
      chai.expect(Voca.isAlphaDigit(false)).to.be.true;
    });

    it('should return true for a positive number or numeric string', function () {
      chai.expect(Voca.isAlphaDigit(0)).to.be.true;
      chai.expect(Voca.isAlphaDigit(10)).to.be.true;
      chai.expect(Voca.isAlphaDigit(0xFF)).to.be.true;
      chai.expect(Voca.isAlphaDigit('0')).to.be.true;
      chai.expect(Voca.isAlphaDigit('10')).to.be.true;
      chai.expect(Voca.isAlphaDigit('0xFF')).to.be.true;
      chai.expect(Voca.isAlphaDigit(NaN)).to.be.true;
      chai.expect(Voca.isAlphaDigit(Infinity)).to.be.true;
    });

    it('should return false for a non alpha and non digit string', function () {
      chai.expect(Voca.isAlphaDigit('Hello World!')).to.be.false;
      chai.expect(Voca.isAlphaDigit('Hello World! It is 2016.')).to.be.false;
      chai.expect(Voca.isAlphaDigit('\nHello World!\n')).to.be.false;
      chai.expect(Voca.isAlphaDigit('JavaScript 2015')).to.be.false;
      chai.expect(Voca.isAlphaDigit(' ')).to.be.false;
      chai.expect(Voca.isAlphaDigit('\n')).to.be.false;
      chai.expect(Voca.isAlphaDigit('\t')).to.be.false;
      chai.expect(Voca.isAlphaDigit(PRINTABLE_ASCII)).to.be.false;
    });

    it('should return false for a non alpha and non digit russian string', function () {
      chai.expect(Voca.isAlphaDigit('привет мир!')).to.be.false;
      chai.expect(Voca.isAlphaDigit('Привет Мир! Это 2016')).to.be.false;
      chai.expect(Voca.isAlphaDigit('\nПривет-Мир\n')).to.be.false;
      chai.expect(Voca.isAlphaDigit('ЯваСкрипт 2015')).to.be.false;
    });

    it('should return false for a non alpha and non digit japanese string', function () {
      chai.expect(Voca.isAlphaDigit('こんにちは世界00!')).to.be.false;
      chai.expect(Voca.isAlphaDigit('ジャバスクリプト 2015(2016)')).to.be.false;
    });

    it('should return false for an array with a non alpha and non digit string item', function () {
      chai.expect(Voca.isAlphaDigit(['Hello World!'])).to.be.false;
      chai.expect(Voca.isAlphaDigit(['Ява Скрипт, привет!'])).to.be.false;
    });

    it('should return false for a non alpha and non digit string representation of an object', function () {
      chai.expect(Voca.isAlphaDigit({
        toString: function toString() {
          return 'Hello World! How are you?';
        }
      })).to.be.false;
      chai.expect(Voca.isAlphaDigit({
        toString: function toString() {
          return 'Ява Скрипт, Привет!';
        }
      })).to.be.false;
    });

    it('should return false for an undefined', function () {
      chai.expect(Voca.isAlphaDigit(undefined)).to.be.false;
      chai.expect(Voca.isAlphaDigit()).to.be.false;
    });

    it('should return false for a null', function () {
      chai.expect(Voca.isAlphaDigit(null)).to.be.false;
    });

    it('should return false for a negative number or numeric string', function () {
      chai.expect(Voca.isAlphaDigit(-1)).to.be.false;
      chai.expect(Voca.isAlphaDigit(-12.05)).to.be.false;
      chai.expect(Voca.isAlphaDigit('-12.05')).to.be.false;
    });

    it('should return false for an empty string', function () {
      chai.expect(Voca.isAlphaDigit('')).to.be.false;
    });
  });

  describe('isBlank', function () {

    it('should return false for a non empty string', function () {
      chai.expect(Voca.isBlank('Hello World!')).to.be.false;
      chai.expect(Voca.isBlank('a')).to.be.false;
      chai.expect(Voca.isBlank(PRINTABLE_ASCII)).to.be.false;
    });

    it('should return false for a non empty string representation of an object', function () {
      chai.expect(Voca.isBlank(['Hello world'])).to.be.false;
      chai.expect(Voca.isBlank({
        toString: function toString() {
          return 'Welcome to New York';
        }
      })).to.be.false;
    });

    it('should return false for a boolean', function () {
      chai.expect(Voca.isBlank(true)).to.be.false;
      chai.expect(Voca.isBlank(false)).to.be.false;
    });

    it('should return false for a number', function () {
      chai.expect(Voca.isBlank(0)).to.be.false;
      chai.expect(Voca.isBlank(100)).to.be.false;
      chai.expect(Voca.isBlank(-1.5)).to.be.false;
    });

    it('should return true for an empty string', function () {
      chai.expect(Voca.isBlank('')).to.be.true;
    });

    it('should return true for a string with whitespaces', function () {
      chai.expect(Voca.isBlank(' ')).to.be.true;
      chai.expect(Voca.isBlank('   ')).to.be.true;
      chai.expect(Voca.isBlank(' \n  ')).to.be.true;
      chai.expect(Voca.isBlank('\f\n\r\t\v')).to.be.true;
    });

    it('should return true for an empty string string representation of an object', function () {
      chai.expect(Voca.isBlank(['\n\n'])).to.be.true;
      chai.expect(Voca.isBlank({
        toString: function toString() {
          return ' ';
        }
      })).to.be.true;
    });

    it('should return true for an undefined', function () {
      chai.expect(Voca.isBlank(undefined)).to.be.true;
      chai.expect(Voca.isBlank()).to.be.true;
    });

    it('should return true for a null', function () {
      chai.expect(Voca.isBlank(null)).to.be.true;
    });
  });

  describe('isDigit', function () {

    it('should return true for a digit string', function () {
      chai.expect(Voca.isDigit('0')).to.be.true;
      chai.expect(Voca.isDigit('1000')).to.be.true;
      chai.expect(Voca.isDigit('1234567890')).to.be.true;
      chai.expect(Voca.isDigit('00')).to.be.true;
    });

    it('should return true for an array with one digit string item', function () {
      chai.expect(Voca.isDigit(['00'])).to.be.true;
      chai.expect(Voca.isDigit(['12'])).to.be.true;
      chai.expect(Voca.isDigit(['1234567890'])).to.be.true;
    });

    it('should return true for a digit string representation of an object', function () {
      chai.expect(Voca.isDigit({
        toString: function toString() {
          return '123';
        }
      })).to.be.true;
      chai.expect(Voca.isDigit({
        toString: function toString() {
          return '567';
        }
      })).to.be.true;
      chai.expect(Voca.isDigit({
        toString: function toString() {
          return '00';
        }
      })).to.be.true;
    });

    it('should return true for a positive integer number', function () {
      chai.expect(Voca.isDigit(0)).to.be.true;
      chai.expect(Voca.isDigit(1000)).to.be.true;
      chai.expect(Voca.isDigit(0xFF)).to.be.true;
      chai.expect(Voca.isDigit(0x1fffffffffffff)).to.be.true;
    });

    it('should return false for a boolean', function () {
      chai.expect(Voca.isDigit(true)).to.be.false;
      chai.expect(Voca.isDigit(false)).to.be.false;
    });

    it('should return false for a non-digit string', function () {
      chai.expect(Voca.isDigit('hell0w0rld!')).to.be.false;
      chai.expect(Voca.isDigit('hello world! 12')).to.be.false;
      chai.expect(Voca.isDigit('\nhell0 w0rld!\n')).to.be.false;
      chai.expect(Voca.isDigit('JavaScript 2015')).to.be.false;
      chai.expect(Voca.isDigit('isAlpha(0)')).to.be.false;
      chai.expect(Voca.isDigit('привет0мир!1200')).to.be.false;
      chai.expect(Voca.isDigit('12.0')).to.be.false;
      chai.expect(Voca.isDigit('-1')).to.be.false;
      chai.expect(Voca.isDigit(PRINTABLE_ASCII)).to.be.false;
    });

    it('should return false for an array with a non-digit string item', function () {
      chai.expect(Voca.isDigit(['Hello 1000000 visitor'])).to.be.false;
      chai.expect(Voca.isDigit(['0.0'])).to.be.false;
    });

    it('should return false for a non digit string representation of an object', function () {
      chai.expect(Voca.isDigit({
        toString: function toString() {
          return 'Hello World! 007';
        }
      })).to.be.false;
      chai.expect(Voca.isDigit({
        toString: function toString() {
          return 'Ява Скрипт, привет 0!';
        }
      })).to.be.false;
    });

    it('should return false for an undefined', function () {
      chai.expect(Voca.isDigit(undefined)).to.be.false;
      chai.expect(Voca.isDigit()).to.be.false;
    });

    it('should return false for a null', function () {
      chai.expect(Voca.isDigit(null)).to.be.false;
    });

    it('should return false for a negative number or negative numeric string', function () {
      chai.expect(Voca.isDigit(-12)).to.be.false;
      chai.expect(Voca.isDigit(-100)).to.be.false;
      chai.expect(Voca.isDigit(-12.05)).to.be.false;
      chai.expect(Voca.isDigit('-1')).to.be.false;
      chai.expect(Voca.isDigit('-12.05')).to.be.false;
    });

    it('should return false for float numbers', function () {
      chai.expect(Voca.isDigit(0.5)).to.be.false;
      chai.expect(Voca.isDigit(12.05)).to.be.false;
      chai.expect(Voca.isDigit(100.001)).to.be.false;
    });

    it('should return false for an Infinity number', function () {
      chai.expect(Voca.isDigit(Infinity)).to.be.false;
    });

    it('should return false for a NaN number', function () {
      chai.expect(Voca.isDigit(NaN)).to.be.false;
    });

    it('should return false for an empty string', function () {
      chai.expect(Voca.isDigit('')).to.be.false;
    });
  });

  describe('isEmpty', function () {

    it('should return true for an empty string', function () {
      chai.expect(Voca.isEmpty('')).to.be.true;
    });

    it('should return true for an undefined', function () {
      chai.expect(Voca.isEmpty(undefined)).to.be.true;
      chai.expect(Voca.isEmpty()).to.be.true;
    });

    it('should return true for a null', function () {
      chai.expect(Voca.isEmpty(null)).to.be.true;
    });

    it('should return false for a non empty string', function () {
      chai.expect(Voca.isEmpty('Hello World!')).to.be.false;
      chai.expect(Voca.isEmpty('a')).to.be.false;
      chai.expect(Voca.isEmpty(' ')).to.be.false;
      chai.expect(Voca.isEmpty(PRINTABLE_ASCII)).to.be.false;
    });

    it('should return false for a non empty string representation of an object', function () {
      chai.expect(Voca.isEmpty(['Hello world'])).to.be.false;
      chai.expect(Voca.isEmpty({
        toString: function toString() {
          return ' ';
        }
      })).to.be.false;
    });

    it('should return false for a boolean', function () {
      chai.expect(Voca.isEmpty(true)).to.be.false;
      chai.expect(Voca.isEmpty(false)).to.be.false;
    });

    it('should return false for a number', function () {
      chai.expect(Voca.isEmpty(0)).to.be.false;
      chai.expect(Voca.isEmpty(100)).to.be.false;
      chai.expect(Voca.isEmpty(-1.5)).to.be.false;
    });
  });

  describe('isLowerCase', function () {

    it('should return true for a lower case string', function () {
      chai.expect(Voca.isLowerCase('a')).to.be.true;
      chai.expect(Voca.isLowerCase('helloworld')).to.be.true;
      chai.expect(Voca.isLowerCase('welcometoearth')).to.be.true;
      chai.expect(Voca.isLowerCase('приветземляне')).to.be.true;
      chai.expect(Voca.isLowerCase('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
    });

    it('should return true for a lower case string representation of an object', function () {
      chai.expect(Voca.isLowerCase(['robocop'])).to.be.true;
      chai.expect(Voca.isLowerCase({
        toString: function toString() {
          return 'batman';
        }
      })).to.be.true;
    });

    it('should return true for a boolean', function () {
      chai.expect(Voca.isLowerCase(true)).to.be.true;
      chai.expect(Voca.isLowerCase(false)).to.be.true;
    });

    it('should return false for a string containing upper case characters', function () {
      chai.expect(Voca.isLowerCase('Helloworld')).to.be.false;
      chai.expect(Voca.isLowerCase('WELCOMETOEARTH')).to.be.false;
      chai.expect(Voca.isLowerCase('ПриветЗемляне')).to.be.false;
    });

    it('should return false for a string containing characters different than lower case', function () {
      chai.expect(Voca.isLowerCase('hello world!')).to.be.false;
      chai.expect(Voca.isLowerCase('No one cared who I was until I put on the mask.')).to.be.false;
      chai.expect(Voca.isLowerCase('Привет, Земляне!')).to.be.false;
      chai.expect(Voca.isLowerCase('\n')).to.be.false;
      chai.expect(Voca.isLowerCase('\t')).to.be.false;
      chai.expect(Voca.isLowerCase(' ')).to.be.false;
      chai.expect(Voca.isLowerCase('')).to.be.false;
      chai.expect(Voca.isLowerCase(PRINTABLE_ASCII)).to.be.false;
    });

    it('should return false for a non lower case string representation of an object', function () {
      chai.expect(Voca.isLowerCase(['RoboCop'])).to.be.false;
      chai.expect(Voca.isLowerCase({
        toString: function toString() {
          return 'Batman';
        }
      })).to.be.false;
    });

    it('should return false for a number or numeric string', function () {
      chai.expect(Voca.isLowerCase(0)).to.be.false;
      chai.expect(Voca.isLowerCase(-1500)).to.be.false;
      chai.expect(Voca.isLowerCase(2017)).to.be.false;
      chai.expect(Voca.isLowerCase('0')).to.be.false;
      chai.expect(Voca.isLowerCase('1998')).to.be.false;
    });

    it('should return false for a null', function () {
      chai.expect(Voca.isLowerCase(null)).to.be.false;
    });

    it('should return false for an undefined', function () {
      chai.expect(Voca.isLowerCase(undefined)).to.be.false;
      chai.expect(Voca.isLowerCase()).to.be.false;
    });
  });

  describe('isNumeric', function () {

    it('should return true for a number', function () {
      chai.expect(Voca.isNumeric(0)).to.be.true;
      chai.expect(Voca.isNumeric(+0)).to.be.true;
      chai.expect(Voca.isNumeric(1000)).to.be.true;
      chai.expect(Voca.isNumeric(-1000)).to.be.true;
      chai.expect(Voca.isNumeric(0xFF)).to.be.true;
      chai.expect(Voca.isNumeric(1.56)).to.be.true;
      chai.expect(Voca.isNumeric(-10.888)).to.be.true;
      chai.expect(Voca.isNumeric(125e5)).to.be.true;
      chai.expect(Voca.isNumeric(125e-3)).to.be.true;
    });

    it('should return true for a numeric string', function () {
      chai.expect(Voca.isNumeric('0')).to.be.true;
      chai.expect(Voca.isNumeric('+0')).to.be.true;
      chai.expect(Voca.isNumeric('0.0')).to.be.true;
      chai.expect(Voca.isNumeric('1000')).to.be.true;
      chai.expect(Voca.isNumeric('-1000')).to.be.true;
      chai.expect(Voca.isNumeric('0xFF')).to.be.true;
      chai.expect(Voca.isNumeric('1.56')).to.be.true;
      chai.expect(Voca.isNumeric('-10.888')).to.be.true;
      chai.expect(Voca.isNumeric('125e5')).to.be.true;
      chai.expect(Voca.isNumeric('125e-3')).to.be.true;
    });

    it('should return true for a numeric string representation of an object', function () {
      chai.expect(Voca.isNumeric([0])).to.be.true;
      chai.expect(Voca.isNumeric(['0'])).to.be.true;
      chai.expect(Voca.isNumeric(['0.0'])).to.be.true;
      chai.expect(Voca.isNumeric({
        toString: function toString() {
          return '100';
        }
      })).to.be.true;
    });

    it('should return false for a non numeric string', function () {
      chai.expect(Voca.isNumeric('FF')).to.be.false;
      chai.expect(Voca.isNumeric('0FF')).to.be.false;
      chai.expect(Voca.isNumeric('Hello World!')).to.be.false;
      chai.expect(Voca.isNumeric('!0')).to.be.false;
      chai.expect(Voca.isNumeric('1.0 0')).to.be.false;
      chai.expect(Voca.isNumeric('Infinity')).to.be.false;
      chai.expect(Voca.isNumeric('NaN')).to.be.false;
      chai.expect(Voca.isNumeric(' ')).to.be.false;
      chai.expect(Voca.isNumeric(PRINTABLE_ASCII)).to.be.false;
    });

    it('should return false for a non numeric string representation of an object', function () {
      chai.expect(Voca.isNumeric(['Hello World!'])).to.be.false;
      chai.expect(Voca.isNumeric({
        toString: function toString() {
          return 'NaN';
        }
      })).to.be.false;
    });

    it('should return false for a boolean', function () {
      chai.expect(Voca.isNumeric(true)).to.be.false;
      chai.expect(Voca.isNumeric(false)).to.be.false;
    });

    it('should return false for an undefined', function () {
      chai.expect(Voca.isNumeric(undefined)).to.be.false;
      chai.expect(Voca.isNumeric()).to.be.false;
    });

    it('should return false for a null', function () {
      chai.expect(Voca.isNumeric(null)).to.be.false;
    });

    it('should return false for an Inifinty', function () {
      chai.expect(Voca.isNumeric(null)).to.be.false;
    });

    it('should return false for a NaN', function () {
      chai.expect(Voca.isNumeric(null)).to.be.false;
    });

    it('should return false for an empty string', function () {
      chai.expect(Voca.isNumeric('')).to.be.false;
    });
  });

  describe('isString', function () {

    it('should return true for a string', function () {
      chai.expect(Voca.isString('Hello World!')).to.be.true;
      chai.expect(Voca.isString('')).to.be.true;
      chai.expect(Voca.isString('\n')).to.be.true;
      chai.expect(Voca.isString(PRINTABLE_ASCII)).to.be.true;
    });

    it('should return false for a null', function () {
      chai.expect(Voca.isString(null)).to.be.false;
    });

    it('should return false for an undefined', function () {
      chai.expect(Voca.isString(undefined)).to.be.false;
      chai.expect(Voca.isString()).to.be.false;
    });

    it('should return false for a boolean', function () {
      chai.expect(Voca.isString(true)).to.be.false;
      chai.expect(Voca.isString(false)).to.be.false;
    });

    it('should return false for a number', function () {
      chai.expect(Voca.isString(100)).to.be.false;
      chai.expect(Voca.isString(-40)).to.be.false;
    });

    it('should return false for an object', function () {
      chai.expect(Voca.isString([])).to.be.false;
      chai.expect(Voca.isString({})).to.be.false;
      chai.expect(Voca.isString(new Date())).to.be.false;
    });
  });

  describe('isUpperCase', function () {

    it('should return true for an upper case string', function () {
      chai.expect(Voca.isUpperCase('A')).to.be.true;
      chai.expect(Voca.isUpperCase('HELLOWORLD')).to.be.true;
      chai.expect(Voca.isUpperCase('WELCOMETOEARTH')).to.be.true;
      chai.expect(Voca.isUpperCase('ПРИВЕТЗЕМЛЯНЕ')).to.be.true;
      chai.expect(Voca.isUpperCase('ÁÉÈÊËÍÎÏÓÔÚÛÝÀÒÜÇÄÖÂÙŸÃÕÑ')).to.be.true;
    });

    it('should return true for a lower case string representation of an object', function () {
      chai.expect(Voca.isUpperCase(['ROBOCOP'])).to.be.true;
      chai.expect(Voca.isUpperCase({
        toString: function toString() {
          return 'BATMAN';
        }
      })).to.be.true;
    });

    it('should return false for a string containing lower case characters', function () {
      chai.expect(Voca.isUpperCase('Helloworld')).to.be.false;
      chai.expect(Voca.isUpperCase('WeLCOMETOEARTH')).to.be.false;
      chai.expect(Voca.isUpperCase('ПриветЗемляне')).to.be.false;
    });

    it('should return false for a boolean', function () {
      chai.expect(Voca.isUpperCase(true)).to.be.false;
      chai.expect(Voca.isUpperCase(false)).to.be.false;
    });

    it('should return false for a string containing characters different than upper case', function () {
      chai.expect(Voca.isUpperCase('hello world!')).to.be.false;
      chai.expect(Voca.isUpperCase('No one cared who I was until I put on the mask.')).to.be.false;
      chai.expect(Voca.isUpperCase('Привет, Земляне!')).to.be.false;
      chai.expect(Voca.isUpperCase('\n')).to.be.false;
      chai.expect(Voca.isUpperCase('\t')).to.be.false;
      chai.expect(Voca.isUpperCase(' ')).to.be.false;
      chai.expect(Voca.isUpperCase('')).to.be.false;
      chai.expect(Voca.isUpperCase(PRINTABLE_ASCII)).to.be.false;
    });

    it('should return false for a non upper case string representation of an object', function () {
      chai.expect(Voca.isUpperCase(['RoboCop'])).to.be.false;
      chai.expect(Voca.isUpperCase({
        toString: function toString() {
          return 'Batman';
        }
      })).to.be.false;
    });

    it('should return false for a number or numeric string', function () {
      chai.expect(Voca.isUpperCase(0)).to.be.false;
      chai.expect(Voca.isUpperCase(-1500)).to.be.false;
      chai.expect(Voca.isUpperCase(2017)).to.be.false;
      chai.expect(Voca.isUpperCase('0')).to.be.false;
      chai.expect(Voca.isUpperCase('1998')).to.be.false;
    });

    it('should return false for a null', function () {
      chai.expect(Voca.isUpperCase(null)).to.be.false;
    });

    it('should return false for an undefined', function () {
      chai.expect(Voca.isUpperCase(undefined)).to.be.false;
      chai.expect(Voca.isUpperCase()).to.be.false;
    });
  });

  describe('matches', function () {

    it('should return true for a string that matches a regular expression object', function () {
      chai.expect(Voca.matches('pacific ocean', /ocean/)).to.be.true;
      chai.expect(Voca.matches('pacific ocean', /^pacific ocean$/)).to.be.true;
      chai.expect(Voca.matches(undefined, /.?/)).to.be.true;
      chai.expect(Voca.matches(null, /.?/)).to.be.true;
    });

    it('should return true for a string that matches a regular expression string', function () {
      chai.expect(Voca.matches('pacific ocean', 'ocean')).to.be.true;
      chai.expect(Voca.matches('pacific ocean', '^pacific ocean$')).to.be.true;
      chai.expect(Voca.matches('pacific ocean', 'PACIFIC', 'i')).to.be.true;
      chai.expect(Voca.matches('pacific ocean', '\\s')).to.be.true;
      chai.expect(Voca.matches(undefined, '.?')).to.be.true;
      chai.expect(Voca.matches(null, '.?')).to.be.true;
      chai.expect(Voca.matches(PRINTABLE_ASCII, '\s')).to.be.true;
    });

    it('should return true for a string that matches a string representation of an object', function () {
      chai.expect(Voca.matches(['atlantic ocean'], /atlantic/)).to.be.true;
      chai.expect(Voca.matches('pacific ocean', ['^pacific ocean$'])).to.be.true;
      chai.expect(Voca.matches({
        toString: function toString() {
          return 'pacific ocean';
        }
      }, 'PACIFIC', 'i')).to.be.true;
      chai.expect(Voca.matches(['pacific ocean'], ['\\s'])).to.be.true;
    });

    it('should return true for a number that matches a regular expression', function () {
      chai.expect(Voca.matches(1500, /\d/)).to.be.true;
      chai.expect(Voca.matches(685, 68)).to.be.true;
      chai.expect(Voca.matches(-1.5, /^\-1\.5$/)).to.be.true;
    });

    it('should return true for a boolean that matches a regular expression', function () {
      chai.expect(Voca.matches(true, /true/)).to.be.true;
      chai.expect(Voca.matches(false, 'false')).to.be.true;
    });

    it('should return false for a string that does not match a regular expression object', function () {
      chai.expect(Voca.matches('pacific ocean', /^ocean/)).to.be.false;
      chai.expect(Voca.matches('pacific ocean', /^atlantic ocean$/)).to.be.false;
      chai.expect(Voca.matches(undefined, /a/)).to.be.false;
    });

    it('should return false for a string that does not match a regular expression string', function () {
      chai.expect(Voca.matches('pacific ocean', 'sea')).to.be.false;
      chai.expect(Voca.matches('pacific ocean', '^atlantic ocean$')).to.be.false;
      chai.expect(Voca.matches('pacific ocean', 'PACIFIC')).to.be.false;
      chai.expect(Voca.matches('pacific ocean', '\\n')).to.be.false;
      chai.expect(Voca.matches(undefined, '\s')).to.be.false;
    });

    it('should return false for a null or undefined pattern', function () {
      chai.expect(Voca.matches('pacific ocean', undefined)).to.be.false;
      chai.expect(Voca.matches('pacific ocean', null)).to.be.false;
    });
  });

  describe('startsWith', function () {

    it('should return true for a valid starting string', function () {
      chai.expect(Voca.startsWith('Hello World!', '')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'H')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'He')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hel')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hell')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello ')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello W')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello Wo')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello Wor')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello Worl')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello World')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello World!')).to.be.true;
      chai.expect(Voca.startsWith('Привет Мир!', 'Привет')).to.be.true;
      chai.expect(Voca.startsWith('', '')).to.be.true;
      chai.expect(Voca.startsWith(PRINTABLE_ASCII, ' ')).to.be.true;
    });

    it('should return true for a valid starting string and position', function () {
      chai.expect(Voca.startsWith('Hello World!', '', 0)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', '!', 'Hello World!'.length - 1)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'd!', 'Hello World!'.length - 2)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'ld!', 'Hello World!'.length - 3)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'rld!', 'Hello World!'.length - 4)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'orld!', 'Hello World!'.length - 5)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'World!', 'Hello World!'.length - 6)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', ' World!', 'Hello World!'.length - 7)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'o World!', 'Hello World!'.length - 8)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'lo World!', 'Hello World!'.length - 9)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'llo World!', 'Hello World!'.length - 10)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'ello World!', 'Hello World!'.length - 11)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello World!', 0)).to.be.true;
      chai.expect(Voca.startsWith('', '', 0)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello', NaN)).to.be.true;
    });

    it('should return true for a correct downcast of the position', function () {
      chai.expect(Voca.startsWith('Hello World!', 'ello', '1')).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'ello', 1.1)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello', -1)).to.be.true;
      chai.expect(Voca.startsWith('Hello World!', 'Hello', -Infinity)).to.be.true;
    });

    it('should return true for an empty starting string', function () {
      [0, 1, 100, Infinity, undefined, NaN, null].forEach(function (position) {
        chai.expect(Voca.startsWith('Hello World!', '', position)).to.be.true;
      });
    });

    it('should return true for a valid starting as a number', function () {
      chai.expect(Voca.startsWith(1000, 100)).to.be.true;
      chai.expect(Voca.startsWith(1250, 12)).to.be.true;
      chai.expect(Voca.startsWith('916', 91)).to.be.true;
    });

    it('should return true for a valid ending in a string representation of an object', function () {
      chai.expect(Voca.startsWith(['Welcome to Earth'], 'Welcome')).to.be.true;
      chai.expect(Voca.startsWith({
        toString: function toString() {
          return 'Let us not stand on ceremony, Mr. Wayne.';
        }
      }, ['Let us not stand on ceremony'])).to.be.true;
    });

    it('should return false for an invalid starting string', function () {
      chai.expect(Voca.startsWith('The shadows betray you, because they belong to me!', 'belong to me!')).to.be.false;
      chai.expect(Voca.startsWith('The shadows betray you, because they belong to me!', 'he shadows')).to.be.false;
      chai.expect(Voca.startsWith('They belong to me!', 'hey belong to me!')).to.be.false;
      chai.expect(Voca.startsWith('They belong to me!', 'belong')).to.be.false;
      chai.expect(Voca.startsWith('', 'The shadows')).to.be.false;
    });

    it('should return false for an invalid starting string and position', function () {
      chai.expect(Voca.startsWith('The shadows betray you, because they belong to me!', 'The shadows betray you', 1)).to.be.false;
      chai.expect(Voca.startsWith('They belong to me!', 'They belong to me!', 1)).to.be.false;
      chai.expect(Voca.startsWith('They belong to me!', 'They', 1)).to.be.false;
      chai.expect(Voca.startsWith('They belong to me!', 'belong', 2)).to.be.false;
      chai.expect(Voca.startsWith('They belong to me!', 'to me!', 3)).to.be.false;
      chai.expect(Voca.startsWith('They belong to me!', 'They belong', 100)).to.be.false;
    });

    it('should return false for an invalid starting number', function () {
      chai.expect(Voca.startsWith(1000, 11)).to.be.false;
      chai.expect(Voca.startsWith(1250, 10)).to.be.false;
      chai.expect(Voca.startsWith('916', 90)).to.be.false;
    });

    it('should return false for undefined and null parameters', function () {
      chai.expect(Voca.startsWith()).to.be.false;
      chai.expect(Voca.startsWith(undefined)).to.be.false;
      chai.expect(Voca.startsWith(undefined, undefined)).to.be.false;
      chai.expect(Voca.startsWith(undefined, undefined, undefined)).to.be.false;
      chai.expect(Voca.startsWith(undefined, undefined, 0)).to.be.false;
      chai.expect(Voca.startsWith(undefined, 'Hello World!')).to.be.false;
      chai.expect(Voca.startsWith(null)).to.be.false;
      chai.expect(Voca.startsWith(null, null)).to.be.false;
      chai.expect(Voca.startsWith(null, null, null)).to.be.false;
      chai.expect(Voca.startsWith(null, null, 0)).to.be.false;
      chai.expect(Voca.startsWith(null, 'Hello World!')).to.be.false;
    });
  });

  describe('chars', function () {

    it('should split a string into characters', function () {
      chai.expect(Voca.chars('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
      chai.expect(Voca.chars('   ')).to.eql([' ', ' ', ' ']);
      chai.expect(Voca.chars('\n\t')).to.eql(['\n', '\t']);
      chai.expect(Voca.chars('')).to.eql([]);
      chai.expect(Voca.chars(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
    });

    it('should split a number into characters', function () {
      chai.expect(Voca.chars(0)).to.eql(['0']);
      chai.expect(Voca.chars(1560)).to.eql(['1', '5', '6', '0']);
      chai.expect(Voca.chars(-1.6)).to.eql(['-', '1', '.', '6']);
    });

    it('should split the string representation of an object', function () {
      chai.expect(Voca.chars(['star'])).to.eql(['s', 't', 'a', 'r']);
      chai.expect(Voca.chars({
        toString: function toString() {
          return 'Capa';
        }
      })).to.eql(['C', 'a', 'p', 'a']);
    });

    it('should return an empty array of characters for null and undefined', function () {
      chai.expect(Voca.chars()).to.eql([]);
      chai.expect(Voca.chars(undefined)).to.eql([]);
      chai.expect(Voca.chars(null)).to.eql([]);
    });
  });

  describe('graphemes', function () {

    it('should split a string into characters', function () {
      chai.expect(Voca.graphemes('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
      chai.expect(Voca.graphemes('   ')).to.eql([' ', ' ', ' ']);
      chai.expect(Voca.graphemes('\n\t')).to.eql(['\n', '\t']);
      chai.expect(Voca.graphemes('')).to.eql([]);
      chai.expect(Voca.graphemes(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
    });

    it('should split a string into surrogate pairs and diacritical marks characters', function () {
      chai.expect(Voca.graphemes('mañana')).to.eql(['m', 'a', 'ñ', 'a', 'n', 'a']);
      chai.expect(Voca.graphemes('é⃝')).to.eql(['é⃝']);
      chai.expect(Voca.graphemes('𝐀𝐁')).to.eql(['𝐀', '𝐁']);
      chai.expect(Voca.graphemes('café')).to.eql(['c', 'a', 'f', 'é']);
      chai.expect(Voca.graphemes('foõ͜͝͞bar')).to.eql(['f', 'o', 'õ͜͝͞', 'b', 'a', 'r']);
      chai.expect(Voca.graphemes('foo𝌆̃͜͝͞bar')).to.eql(['f', 'o', 'o', '𝌆̃͜͝͞', 'b', 'a', 'r']);
    });

    it('should split a number into characters', function () {
      chai.expect(Voca.graphemes(0)).to.eql(['0']);
      chai.expect(Voca.graphemes(1560)).to.eql(['1', '5', '6', '0']);
      chai.expect(Voca.graphemes(-1.6)).to.eql(['-', '1', '.', '6']);
    });

    it('should split the string representation of an object', function () {
      chai.expect(Voca.graphemes(['star'])).to.eql(['s', 't', 'a', 'r']);
      chai.expect(Voca.graphemes({
        toString: function toString() {
          return 'Capa';
        }
      })).to.eql(['C', 'a', 'p', 'a']);
    });

    it('should return an empty array of characters for null and undefined', function () {
      chai.expect(Voca.graphemes()).to.eql([]);
      chai.expect(Voca.graphemes(undefined)).to.eql([]);
      chai.expect(Voca.graphemes(null)).to.eql([]);
    });
  });

  describe('split', function () {

    it('should split a string into chunks', function () {
      chai.expect(Voca.split('stellar bomb', ' ')).to.eql(['stellar', 'bomb']);
      chai.expect(Voca.split('   ', ' ')).to.eql(['', '', '', '']);
      chai.expect(Voca.split('dying star', /\s/)).to.eql(['dying', 'star']);
      chai.expect(Voca.split('*dying*star*', /\*/)).to.eql(['', 'dying', 'star', '']);
      chai.expect(Voca.split('', '')).to.eql([]);
      chai.expect(Voca.split('star', '')).to.eql(['s', 't', 'a', 'r']);
    });

    it('should split a number into chunks', function () {
      chai.expect(Voca.split(0)).to.eql(['0']);
      chai.expect(Voca.split(1560, '6')).to.eql(['15', '0']);
      chai.expect(Voca.split(-1.6, /\./)).to.eql(['-1', '6']);
    });

    it('should split the string representation of an object', function () {
      chai.expect(Voca.split('rising star', ' ')).to.eql(['rising', 'star']);
      chai.expect(Voca.split({
        toString: function toString() {
          return 'rising-star';
        }
      }, /\-/)).to.eql(['rising', 'star']);
    });

    it('should return the string as an item of an array for an empty separator', function () {
      chai.expect(Voca.split('star')).to.eql(['star']);
      chai.expect(Voca.split('star', null)).to.eql(['star']);
      chai.expect(Voca.split('star', undefined)).to.eql(['star']);
    });
  });

  describe('words', function () {

    it('should split the string into words', function () {
      chai.expect(Voca.words('123')).to.eql(['123']);
      chai.expect(Voca.words('hello')).to.eql(['hello']);
      chai.expect(Voca.words('  hello   ')).to.eql(['hello']);
      chai.expect(Voca.words('hello world')).to.eql(['hello', 'world']);
      chai.expect(Voca.words('12+14-18*400')).to.eql(['12', '14', '18', '400']);
      chai.expect(Voca.words('gravity can cross dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
      chai.expect(Voca.words('-gravity-can-cross-dimensions-')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
      chai.expect(Voca.words('gravity_can_cross_dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
      chai.expect(Voca.words('*gravity***can****cross&&dimensions++')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
      chai.expect(Voca.words('GravityCanCrossDimensions')).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
      chai.expect(Voca.words('GRAVITYCan')).to.eql(['GRAVITY', 'Can']);
      chai.expect(Voca.words('GravityCan')).to.eql(['Gravity', 'Can']);
      chai.expect(Voca.words('GravityCANAttract')).to.eql(['Gravity', 'CAN', 'Attract']);
      chai.expect(Voca.words('gravityCan')).to.eql(['gravity', 'Can']);
      chai.expect(Voca.words('Gravity-Can11Cross **Dimensions1Foo')).to.eql(['Gravity', 'Can', '11', 'Cross', 'Dimensions', '1', 'Foo']);
      chai.expect(Voca.words('Cooper... Cooper... Come in, Cooper.')).to.eql(['Cooper', 'Cooper', 'Come', 'in', 'Cooper']);
      chai.expect(Voca.words('Newton\'s third law')).to.eql(['Newton', 's', 'third', 'law']);
      chai.expect(Voca.words('Newton\'s thIrd lAw')).to.eql(['Newton', 's', 'th', 'Ird', 'l', 'Aw']);
      chai.expect(Voca.words(PRINTABLE_ASCII)).to.eql(['0123456789', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz']);
      chai.expect(Voca.words('')).to.eql([]);
      chai.expect(Voca.words()).to.eql([]);
      chai.expect(Voca.words(' ')).to.eql([]);
      chai.expect(Voca.words('     ')).to.eql([]);
      chai.expect(Voca.words('\n')).to.eql([]);
      chai.expect(Voca.words('***')).to.eql([]);
      chai.expect(Voca.words('***---')).to.eql([]);
      chai.expect(Voca.words('***---')).to.eql([]);
      chai.expect(Voca.words('mañana')).to.eql(['mañana']);
      chai.expect(Voca.words('maÑana')).to.eql(['ma', 'Ñana']);
      chai.expect(Voca.words('foõ͜͝͞ bar')).to.eql(['foõ͜͝͞', 'bar']);
      chai.expect(Voca.words('fo-O-Õ͜͝͞-bar')).to.eql(['fo', 'O', 'Õ͜͝͞', 'bar']);
    });

    it('should split the string with diacritics and non-latin characters into words', function () {
      chai.expect(Voca.words('Στις αρχές του 21ου αιώνα')).to.eql(['Στις', 'αρχές', 'του', '21', 'ου', 'αιώνα']);
      chai.expect(Voca.words('Гравитация притягивает все')).to.eql(['Гравитация', 'притягивает', 'все']);
      chai.expect(Voca.words('ГравитацияПритягиваетВСЕ')).to.eql(['Гравитация', 'Притягивает', 'ВСЕ']);
      chai.expect(Voca.words('clasificación biológica.')).to.eql(['clasificación', 'biológica']);
    });

    it('should split the string representation of an object', function () {
      chai.expect(Voca.words(['GravityCanCrossDimensions'])).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
      chai.expect(Voca.words({
        toString: function toString() {
          return 'Gr4v1ty';
        }
      })).to.eql(['Gr', '4', 'v', '1', 'ty']);
    });

    it('should split the string into words using a pattern', function () {
      chai.expect(Voca.words('1234567890', /\d/g)).to.eql(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
      chai.expect(Voca.words('gravity', /\w{1,2}/g)).to.eql(['gr', 'av', 'it', 'y']);
      chai.expect(Voca.words('gravity can cross dimensions', '\\w+(?=\\s?)', 'g')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
      chai.expect(Voca.words('1234567890', /\s/g)).to.eql([]);
    });

    it('should split the string with default pattern for null and undefined', function () {
      chai.expect(Voca.words('gravity_can_cross_dimensions', null)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
      chai.expect(Voca.words('gravity_can_cross_dimensions', undefined)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    });
  });

  describe('noConflict', function () {

    it('should return Voca library instance and restore v global variable', function () {
      var globalObject = getGlobalObject();
      globalObject.v = Voca;
      var voca = Voca.noConflict();
      chai.expect(voca).to.be.equal(Voca);
      chai.expect(globalObject.v).to.be.equal(undefined);
    });

    it('should return voca library instance and not modify v global variable', function () {
      var globalObject = getGlobalObject();
      var voca = Voca.noConflict();
      chai.expect(voca).to.be.equal(Voca);
      chai.expect(globalObject.v).to.be.equal(undefined);
    });
  });

  describe('version', function () {

    it('should match semantic version number pattern', function () {
      chai.expect(REGEXP_SEMVER.test(Voca.version)).to.be.true;
    });
  });

}(chai));
//# sourceMappingURL=test_bundle.js.map
