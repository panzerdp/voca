(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.v = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  babelHelpers;

  /**
   * Checks if `subject` is a string primitive type.
   *
   * @function isString
   * @static
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
   * Get the string representation of the `value`
   * Converts the `value` to string.
   * If `value` is `null` or `undefined`, return `null`.
   *
   * @ignore
   * @function toString
   * @param {*} value The value to convert.
   * @return {string|null} Returns the string representation of `value`. Returns `null` if `value` is `null` or `undefined`.
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
   * Clip the number to interval `downLimit` to `upLimit`
   *
   * @ignore
   * @function clipNumber
   * @param {number} value The number to clip
   * @param {number} downLimit The down limit
   * @param {number} upLimit The upper limit
   * @return {number} The clip result number
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
   * Transforms `value` to an integer.
   *
   * @ignore
   * @function toInteger
   * @param {number} value The number to transform.
   * @returns {number} Returns the transformed integer.
   */
  function toInteger (value) {
    if (value === Infinity) {
      return Number.MAX_SAFE_INTEGER;
    }
    if (value === -Infinity) {
      return -Number.MAX_SAFE_INTEGER;
    }
    return ~ ~value;
  }

  /**
   * Checks if `subject` ends with `end`.
   *
   * @function endsWith
   * @static
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @param {string} end The ending string.
   * @param {int} [position=subject.length] Search within `subject` as if this string were only `position` long.
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
    var subjectString = toString(nilDefault(subject, '')),
        endString = toString(end);
    if (endString === '') {
      return true;
    }
    position = isNil(position) ? subjectString.length : clipNumber(toInteger(position), 0, subjectString.length);
    position -= endString.length;
    var lastIndex = subjectString.indexOf(endString, position);
    return lastIndex !== -1 && lastIndex === position;
  }

  /**
   * Checks if `subject` includes `search` starting from `position`
   *
   * @function includes
   * @static
   * @memberOf Query
   * @param {string} [subject=''] The string where to search.
   * @param {string} search The string to search.
   * @param {int} [position=0] The position to start searching.
   * @return {boolean} Returns `true` if `subject` includes `search` or `false` otherwise.
   * @example
   * v.includes('starship', 'star');
   * // => true
   *
   * v.includes('galaxy', 'g', 1);
   * // => false
   */
  function includes (subject, search, position) {
    subject = nilDefault(subject, '');
    var subjectString = toString(nilDefault(subject, '')),
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
   * RegEx to match alpha chars in unicode
   *
   * @ignore
   * @see http://stackoverflow.com/a/22075070/1894471
   * @type {RegExp}
   */
  var REGEX_ALPHA = /^[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+$/;

  /**
   * Checks if `subject` contains only alpha characters.
   *
   * @function isAlpha
   * @static
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
    var subjectString = toString(nilDefault(subject, ''));
    return REGEX_ALPHA.test(subjectString);
  }

  /**
   * RegEx to match alpha chars in unicode.
   *
   * @ignore
   * @see http://stackoverflow.com/a/22075070/1894471
   * @type {RegExp}
   */
  var REGEX_ALPHA_DIGIT = /^[\d\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+$/;

  /**
   * Checks if `subject` contains only alpha and digit characters.
   *
   * @function isAlphaDigit
   * @static
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
    var subjectString = toString(nilDefault(subject, ''));
    return REGEX_ALPHA_DIGIT.test(subjectString);
  }

  /**
   * Checks if `subject` is empty or contains only whitespaces.
   *
   * @function isBlank
   * @static
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
    var subjectString = toString(nilDefault(subject, ''));
    return subjectString.trim().length === 0;
  }

  var REGEX_DIGIT = /^\d+$/;

  /**
   * Checks if `subject` contains only digit characters.
   *
   * @function isDigit
   * @static
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
    var subjectString = toString(nilDefault(subject, ''));
    return REGEX_DIGIT.test(subjectString);
  }

  /**
   * Checks if `subject` is empty.
   *
   * @function isEmpty
   * @static
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
    var subjectString = toString(nilDefault(subject, ''));
    return subjectString.length === 0;
  }

  /**
   * Checks if `subject` is lower case.
   *
   * @function isLowerCase
   * @static
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
    var valueString = toString(nilDefault(subject, ''));
    return isAlpha(valueString) && valueString.toLowerCase() === valueString;
  }

  /**
   * Checks if `subject` is numeric.
   *
   * @function isNumeric
   * @static
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
    var valueNumeric = (typeof subject === 'undefined' ? 'undefined' : babelHelpers.typeof(subject)) === 'object' && subject != null ? Number(subject) : subject;
    return (typeof valueNumeric === 'number' || typeof valueNumeric === 'string') && !isNaN(valueNumeric - parseFloat(valueNumeric));
  }

  /**
   * Checks if `subject` is upper case.
   *
   * @function isUpperCase
   * @static
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
    var subjectString = toString(nilDefault(subject, ''));
    return isAlpha(subjectString) && subjectString.toUpperCase() === subjectString;
  }

  /**
   * Checks if `subject` matches the regular expression `pattern`.
   *
   * @function matches
   * @static
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @param {RegExp|string} pattern The pattern to match.
   * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is `string` type.
   * @return {boolean} Returns `true` if `subject` matches `pattern` or `false` otherwise.
   * @example
   * v.matches('pluto', /plus?/);
   * // => true
   *
   * v.matches('sun', 'S', 'i');
   * // => true
   *
   * v.matches('apollo 11', '^\\w+$');
   * // => false
   */
  function matches (subject, pattern, flags) {
    var subjectString = toString(nilDefault(subject, '')),
        flagsString = toString(nilDefault(flags, '')),
        patternString;
    if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
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
   * @memberOf Query
   * @param {string} [subject=''] The string to verify.
   * @param {string} start The starting string.
   * @param {int} [position=0] The position to start searching.
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
    var subjectString = toString(nilDefault(subject, '')),
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
   * Repeats the `subject` number of `times`.
   *
   * @function repeat
   * @static
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to repeat.
   * @param {int} [times=1] The number of times to repeat.
   * @return {string} Returns the repeated string.
   * @example
   * v.repeat('w', 3);
   * // => 'www'
   *
   * v.repeat('world', 0);
   * // => ''
   */
  function repeat (subject, times) {
    var subjectString = toString(nilDefault(subject, '')),
        timesInt = isNil(times) ? 1 : clipNumber(toInteger(times), 0, Number.MAX_SAFE_INTEGER);
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

  var REGEXP_COMBINING_MARKS = /([\0-\u02FF\u0370-\u1AAF\u1B00-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uE000-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])([\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g;
  var REGEXP_SURROGATE_PAIRS = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;
  /**
   * Reverse the `subject`.
   *
   * @function reverse
   * @static
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to reverse.
   * @return {string} Returns the reversed string.
   * @example
   * v.reverse('winter');
   * // => 'retniw'
   */
  function reverse(subject) {
    var subjectString = toString(nilDefault(subject, ''));
    // @see https://github.com/mathiasbynens/esrever
    subjectString = subjectString.replace(REGEXP_COMBINING_MARKS, function ($0, $1, $2) {
      return reverse($2) + $1;
    }).replace(REGEXP_SURROGATE_PAIRS, '$2$1');
    var reversedString = '',
        index = subjectString.length;
    while (index--) {
      reversedString += subjectString.charAt(index);
    }
    return reversedString;
  }

  /**
   * Extracts from `subject` a string from `start` position up to (but not including) `end` position.
   *
   * @function slice
   * @static
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to extract from.
   * @param {int} start The position to start extracting. If negative use it as `subject.length + start`.
   * @param {int} [end=subject.length - 1] The position to end extracting. If negative use it as `subject.length + end`.
   * @return {string} Returns the extracted string.
   * @note Uses native `String.prototype.slice()`
   * @example
   * v.slice('miami', 1);
   * // => 'iami'
   *
   * v.slice('florida', -4);
   * // => 'rida'
   */
  function slice (subject, start, end) {
    var subjectString = toString(nilDefault(subject, ''));
    return subjectString.slice(start, end);
  }

  /**
   * Extracts from `subject` a string from `start` position a number of `length` characters.
   *
   * @function substr
   * @static
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to extract from.
   * @param {int} start The position to start extracting.
   * @param {int} [length=subject.endOfString] The number of characters to extract. If omitted, extract to the end of `subject`.
   * @return {string} Returns the extracted string.
   * @note Uses native `String.prototype.substr()`
   * @example
   * v.substr('infinite loop', 9);
   * // => 'loop'
   *
   * v.substr('dreams', 2, 2);
   * // => 'ea'
   */
  function substr (subject, start, length) {
    var subjectString = toString(nilDefault(subject, ''));
    return subjectString.substr(start, length);
  }

  /**
   * Extract from `subject` a string from `start` position up to (but not include) `end` position.
   *
   * @function substring
   * @static
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to extract from.
   * @param {int} start The position to start extracting.
   * @param {int} [end=subject.length] The position to end extracting. The character at `end` position is not included.
   * @return {string} Returns the extracted string.
   * @note Uses native `String.prototype.substring()`
   * @example
   * v.substring('beach', 1);
   * // => 'each'
   *
   * v.substring('ocean', 1, 3);
   * // => 'ea'
   */
  function substring (subject, start, end) {
    var subjectString = toString(nilDefault(subject, ''));
    return subjectString.substring(start, end);
  }

  var REGEX_TRIM_LEFT = /^[\s\uFEFF\xA0]+/;

  /**
   * Removes the whitespaces from the left part of the `subject`.
   *
   * @function trimLeft
   * @static
   * @memberOf Manipulate
   * @param {string} [subject=''] The string to trim.
   * @param {string} [whitespace=whitespace] The whitespace characters to trim.
   * @return {string} Returns the trimmed string.
   * @example
   * v.trimLeft('  Starship Troopers');
   * // => 'Starship Troopers'
   *
   * v.trim('***Mobile Infantry', '*');
   * // => 'Mobile Infantry'
   */
  function trimLeft (subject, whitespace) {
    var subjectString = toString(nilDefault(subject, ''));
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

  var REGEX_TRIM_RIGHT = /[\s\uFEFF\xA0]+$/;

  /**
   * Removes the whitespaces from the right part of the `subject`.
   *
   * @function trimRight
   * @static
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
    var subjectString = toString(nilDefault(subject, ''));
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
    var subjectString = toString(nilDefault(subject, ''));
    if (whitespace === '' || subjectString === '') {
      return subjectString;
    }
    var whitespaceString = toString(whitespace);
    if (isNil(whitespaceString)) {
      return subjectString.trim();
    }
    return trimRight(trimLeft(subjectString, whitespaceString), whitespaceString);
  }

  var v = {
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

    repeat: repeat,
    reverse: reverse,
    slice: slice,
    substr: substr,
    substring: substring,
    trim: trim,
    trimLeft: trimLeft,
    trimRight: trimRight
  };

  return v;

}));