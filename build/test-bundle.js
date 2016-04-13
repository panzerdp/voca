'use strict';

var chai = require('chai');

require("source-map-support").install();

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
 * Verifies if `value` is `undefined` and returns `defaultValue`. In other case returns `value`.
 *
 * @ignore
 * @function undefinedDefault
 * @param {*} value The value to verify.
 * @param {*} defaultValue The default value.
 * @return {*} Returns `defaultValue` if `value` is `undefined`, otherwise `defaultValue`.
 */
function undefinedDefault (value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
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
 * @param {string} [end] The ending string.
 * @param {int} [position=string.length] Search within `subject` as if this string were only `position` long.
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
  var subjectString = toString(undefinedDefault(subject, '')),
      endString = toString(end);
  if (subjectString === null || endString === null) {
    return false;
  }
  if (endString === '') {
    return true;
  }
  position = isNil(position) ? subjectString.length : clipNumber(toInteger(position), 0, subjectString.length);
  position -= endString.length;
  var lastIndex = subjectString.indexOf(endString, position);
  return lastIndex !== -1 && lastIndex === position;
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
  subject = undefinedDefault(subject, '');
  var subjectString = toString(subject);
  if (subjectString === null) {
    return false;
  }
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
  subject = undefinedDefault(subject, '');
  var subjectString = toString(subject);
  if (subjectString === null) {
    return false;
  }
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
  subject = undefinedDefault(subject, '');
  var subjectString = toString(subject);
  if (subjectString === null) {
    return true;
  }
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
  subject = undefinedDefault(subject, '');
  var subjectString = toString(subject);
  if (subjectString === null) {
    return false;
  }
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
  subject = undefinedDefault(subject, '');
  var subjectString = toString(subject);
  if (subjectString === null) {
    return true;
  }
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
  subject = undefinedDefault(subject, '');
  var valueString = toString(subject);
  if (valueString === null) {
    return false;
  }
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
 * @return {boolean} Return `true` if `subject` is upper case or `false` otherwise.
 * @example
 * v.isUpperCase('ACDC');
 * // => true
 *
 * v.isUpperCase('Morning');
 * // => false
 */
function isUpperCase (subject) {
  subject = undefinedDefault(subject, '');
  var subjectString = toString(subject);
  if (subjectString === null) {
    return false;
  }
  return isAlpha(subjectString) && subjectString.toUpperCase() === subjectString;
}

/**
 * Checks if `subject` starts with `start`.
 *
 * @function startsWith
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} [start] The starting string.
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
  var subjectString = toString(undefinedDefault(subject, '')),
      startString = toString(start);
  if (subjectString === null || startString === null) {
    return false;
  }
  if (startString === '') {
    return true;
  }
  position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
  return subjectString.substr(position, startString.length) === startString;
}

var REGEX_TRIM_LEFT = /^[\s\uFEFF\xA0]+/;

/**
 * Removes the whitespaces from the left part of the `subject`.
 *
 * @function trimLeft
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace to remove.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trimLeft('  Starship Troopers');
 * // => 'Starship Troopers'
 *
 * v.trim('***Mobile Infantry', '*');
 * // => 'Mobile Infantry'
 */
function trimLeft (subject, whitespace) {
  subject = undefinedDefault(subject, '');
  var valueString = toString(subject);
  if (isNil(valueString)) {
    return '';
  }
  if (whitespace === '' || valueString === '') {
    return valueString;
  }
  var whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return valueString.replace(REGEX_TRIM_LEFT, '');
  }
  var matchWhitespace = true,
      totalWhitespaceLength = 0,
      whitespaceStringLength = whitespaceString.length;
  while (matchWhitespace) {
    if (valueString.indexOf(whitespaceString, totalWhitespaceLength) === totalWhitespaceLength) {
      totalWhitespaceLength += whitespaceStringLength;
    } else {
      matchWhitespace = false;
    }
  }
  return valueString.substring(totalWhitespaceLength);
}

var REGEX_TRIM_RIGHT = /[\s\uFEFF\xA0]+$/;

/**
 * Removes the whitespaces from the right part of the `subject`.
 *
 * @function trimRight
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace to remove.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trimRight('the fire rises   ');
 * // => 'the fire rises'
 *
 * v.trimRight('do you feel in charge?---', '-');
 * // => 'do you feel in charge?'
 */
function trimRight (subject, whitespace) {
  subject = undefinedDefault(subject, '');
  var subjectString = toString(subject);
  if (isNil(subjectString)) {
    return '';
  }
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
 * @param {string} [whitespace=whitespace] The whitespaces for trim.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trim(' Mother nature ');
 * // => 'Mother nature'
 *
 * v.trim('--Earth--', '-');
 * // => 'Earth'
 */
function trim (subject, whitespace) {
  subject = undefinedDefault(subject, '');
  var subjectString = toString(subject);
  if (isNil(subjectString)) {
    return '';
  }
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
  isAlpha: isAlpha,
  isAlphaDigit: isAlphaDigit,
  isBlank: isBlank,
  isDigit: isDigit,
  isEmpty: isEmpty,
  isLowerCase: isLowerCase,
  isNumeric: isNumeric,
  isString: isString,
  isUpperCase: isUpperCase,
  startsWith: startsWith,

  trim: trim,
  trimLeft: trimLeft,
  trimRight: trimRight
};

describe('endsWith', function () {

  it('should return true for valid ending string', function () {
    chai.expect(v.endsWith('Hello World!', '')).to.be.true;
    chai.expect(v.endsWith('Hello World!', '!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'd!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'rld!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'orld!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', ' World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'o World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'lo World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'llo World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'ello World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello World!')).to.be.true;
    chai.expect(v.endsWith('Привет Мир!', 'Мир!')).to.be.true;
    chai.expect(v.endsWith('', '')).to.be.true;
  });

  it('should return true for valid ending string and position', function () {
    chai.expect(v.endsWith('Hello World!', '', 'Hello World'.length)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello World!', 'Hello World!'.length)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello World', 'Hello World!'.length - 1)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello Worl', 'Hello World!'.length - 2)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello Wor', 'Hello World!'.length - 3)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello Wo', 'Hello World!'.length - 4)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello W', 'Hello World!'.length - 5)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello ', 'Hello World!'.length - 6)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello', 'Hello World!'.length - 7)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hell', 'Hello World!'.length - 8)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hel', 'Hello World!'.length - 9)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'He', 'Hello World!'.length - 10)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'H', 'Hello World!'.length - 11)).to.be.true;
    chai.expect(v.endsWith('', '', 0)).to.be.true;
  });

  it('should return true for a correct downcast of the position', function () {
    chai.expect(v.endsWith('Hello World!', 'ello', '5')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'ello', 5.1)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'World!', 30000)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'World!', Infinity)).to.be.true;
  });

  it('should return true for an empty ending string', function () {
    [0, 1, 100, Infinity, undefined, NaN, null].forEach(function (position) {
      chai.expect(v.endsWith('Hello World!', '', position)).to.be.true;
    });
  });

  it('should return true for valid ending number', function () {
    chai.expect(v.endsWith(1000, 0)).to.be.true;
    chai.expect(v.endsWith(1250, 50)).to.be.true;
    chai.expect(v.endsWith('916', 16)).to.be.true;
  });

  it('should return true for a valid ending in a string representation of an object', function () {
    chai.expect(v.endsWith(['Welcome to Earth'], 'Earth')).to.be.true;
    chai.expect(v.endsWith({
      toString: function toString() {
        return 'Let us not stand on ceremony, Mr. Wayne.';
      }
    }, ['Mr. Wayne'], 'Let us not stand on ceremony, Mr. Wayne.'.length - 1)).to.be.true;
  });

  it('should return false for an invalid ending string', function () {
    chai.expect(v.endsWith('The shadows betray you, because they belong to me!', 'The shadows')).to.be.false;
    chai.expect(v.endsWith('The shadows betray you, because they belong to me!', 'to me')).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'They belong to me')).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'belong')).to.be.false;
    chai.expect(v.endsWith('', 'The shadows')).to.be.false;
  });

  it('should return false for an invalid ending string and position', function () {
    chai.expect(v.endsWith('The shadows betray you, because they belong to me!', 'they belong to me!', 5)).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'They belong to me!', 'They belong to me!'.length - 1)).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'They', 'They belong to me!'.length)).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'belong', 'They belong to me!'.length)).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'to me!', 0)).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'belong to me!', -100)).to.be.false;
  });

  it('should return false for an invalid ending number', function () {
    chai.expect(v.endsWith(1000, 10)).to.be.false;
    chai.expect(v.endsWith(1250, 55)).to.be.false;
    chai.expect(v.endsWith('916', 18)).to.be.false;
  });

  it('should return false for a NaN position', function () {
    chai.expect(v.endsWith('Hello World!', 'World!', NaN)).to.be.false;
  });

  it('should return false for undefined and null parameters', function () {
    chai.expect(v.endsWith()).to.be.false;
    chai.expect(v.endsWith(undefined)).to.be.false;
    chai.expect(v.endsWith(undefined, undefined)).to.be.false;
    chai.expect(v.endsWith(undefined, undefined, undefined)).to.be.false;
    chai.expect(v.endsWith(undefined, undefined, 0)).to.be.false;
    chai.expect(v.endsWith(undefined, 'Hello World!')).to.be.false;
    chai.expect(v.endsWith(null)).to.be.false;
    chai.expect(v.endsWith(null, null)).to.be.false;
    chai.expect(v.endsWith(null, null, null)).to.be.false;
    chai.expect(v.endsWith(null, null, 0)).to.be.false;
    chai.expect(v.endsWith(null, 'Hello World!')).to.be.false;
  });
});

describe('isAlpha', function () {

  it('should return true for an alpha string', function () {
    chai.expect(v.isAlpha('HelloWorld')).to.be.true;
    chai.expect(v.isAlpha('JavaScript')).to.be.true;
    chai.expect(v.isAlpha('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
  });

  it('should return true for an alpha russian string', function () {
    chai.expect(v.isAlpha('ПриветМир')).to.be.true;
    chai.expect(v.isAlpha('ЯваСкрипт')).to.be.true;
    chai.expect(v.isAlpha('АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя')).to.be.true;
  });

  it('should return true for an alpha japanese string', function () {
    chai.expect(v.isAlpha('こんにちは世界')).to.be.true;
    chai.expect(v.isAlpha('ジャバスクリプト')).to.be.true;
  });

  it('should return true for a string with diacritics', function () {
    chai.expect(v.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for an array with one alpha string item', function () {
    chai.expect(v.isAlpha(['HelloWorld'])).to.be.true;
    chai.expect(v.isAlpha(['ПриветМир'])).to.be.true;
  });

  it('should return true for an alpha string representation of an object', function () {
    chai.expect(v.isAlpha({
      toString: function toString() {
        return 'HelloWorld';
      }
    })).to.be.true;
    chai.expect(v.isAlpha({
      toString: function toString() {
        return 'ПриветМир';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function () {
    chai.expect(v.isAlpha(true)).to.be.true;
    chai.expect(v.isAlpha(false)).to.be.true;
  });

  it('should return true for a NaN or Infinity number', function () {
    chai.expect(v.isAlpha(NaN)).to.be.true;
    chai.expect(v.isAlpha(Infinity)).to.be.true;
  });

  it('should return false for a non-alpha string', function () {
    chai.expect(v.isAlpha('Hello World!')).to.be.false;
    chai.expect(v.isAlpha('\nHello World!\n')).to.be.false;
    chai.expect(v.isAlpha('ECMAScript 5.1 (ECMA-262)')).to.be.false;
    chai.expect(v.isAlpha(' ')).to.be.false;
    chai.expect(v.isAlpha('\n')).to.be.false;
    chai.expect(v.isAlpha('\t')).to.be.false;
    chai.expect(v.isAlpha('0123456789')).to.be.false;
    chai.expect(v.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ 0123456789')).to.be.false;
  });

  it('should return false for a non-alpha russian string', function () {
    chai.expect(v.isAlpha('Привет Мир!')).to.be.false;
    chai.expect(v.isAlpha('\nПривет Мир!\n')).to.be.false;
    chai.expect(v.isAlpha('ECMAScript версии 5.1 (ECMA-262)')).to.be.false;
  });

  it('should return false for a non-alpha japanese string', function () {
    chai.expect(v.isAlpha('こんにちは世界!')).to.be.false;
    chai.expect(v.isAlpha('ジャバスクリプト2015')).to.be.false;
  });

  it('should return false for an array with a non-alpha string item', function () {
    chai.expect(v.isAlpha(['Hello World!'])).to.be.false;
    chai.expect(v.isAlpha(['Привет Мир!'])).to.be.false;
  });

  it('should return false for a non-alpha string representation of an object', function () {
    chai.expect(v.isAlpha({
      toString: function toString() {
        return 'Hello World!';
      }
    })).to.be.false;
    chai.expect(v.isAlpha({
      toString: function toString() {
        return 'Привет Мир!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isAlpha(undefined)).to.be.false;
    chai.expect(v.isAlpha()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isAlpha(null)).to.be.false;
  });

  it('should return false for a number or numeric string', function () {
    chai.expect(v.isAlpha(0)).to.be.false;
    chai.expect(v.isAlpha(10)).to.be.false;
    chai.expect(v.isAlpha(-12.05)).to.be.false;
    chai.expect(v.isAlpha(0xFF)).to.be.false;
    chai.expect(v.isAlpha('0')).to.be.false;
    chai.expect(v.isAlpha('10')).to.be.false;
    chai.expect(v.isAlpha('-12.05')).to.be.false;
    chai.expect(v.isAlpha('0xFF')).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(v.isAlpha('')).to.be.false;
  });
});

describe('isAlphaDigit', function () {

  it('should return true for an alpha and digit string', function () {
    chai.expect(v.isAlphaDigit('HelloWorld')).to.be.true;
    chai.expect(v.isAlphaDigit('HelloWorld007')).to.be.true;
    chai.expect(v.isAlphaDigit('JavaScript6')).to.be.true;
    chai.expect(v.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
    chai.expect(v.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789')).to.be.true;
  });

  it('should return true for an alpha and digit russian string', function () {
    chai.expect(v.isAlphaDigit('ПриветМир')).to.be.true;
    chai.expect(v.isAlphaDigit('ПриветМир007')).to.be.true;
    chai.expect(v.isAlphaDigit('ЯваСкрипт6')).to.be.true;
    chai.expect(v.isAlphaDigit('АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя')).to.be.true;
    chai.expect(v.isAlphaDigit('АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя0123456789')).to.be.true;
  });

  it('should return true for an alpha and digit japanese string', function () {
    chai.expect(v.isAlphaDigit('こんにちは世界')).to.be.true;
    chai.expect(v.isAlphaDigit('こんにちは世界45')).to.be.true;
    chai.expect(v.isAlphaDigit('12ジャバスクリプト')).to.be.true;
  });

  it('should return true for a string with diacritics', function () {
    chai.expect(v.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
    chai.expect(v.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ0123456789')).to.be.true;
  });

  it('should return true for an array with one alpha and digit string item', function () {
    chai.expect(v.isAlphaDigit(['HelloWorld'])).to.be.true;
    chai.expect(v.isAlphaDigit(['HelloWorld007'])).to.be.true;
    chai.expect(v.isAlphaDigit(['ЯваСкрипт6'])).to.be.true;
  });

  it('should return true for an alpha and digit string representation of an object', function () {
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'HelloWorld';
      }
    })).to.be.true;
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'ПриветМир';
      }
    })).to.be.true;
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'JavaScript2016';
      }
    })).to.be.true;
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'ЯваСкрипт2016';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function () {
    chai.expect(v.isAlphaDigit(true)).to.be.true;
    chai.expect(v.isAlphaDigit(false)).to.be.true;
  });

  it('should return true for a positive number or numeric string', function () {
    chai.expect(v.isAlphaDigit(0)).to.be.true;
    chai.expect(v.isAlphaDigit(10)).to.be.true;
    chai.expect(v.isAlphaDigit(0xFF)).to.be.true;
    chai.expect(v.isAlphaDigit('0')).to.be.true;
    chai.expect(v.isAlphaDigit('10')).to.be.true;
    chai.expect(v.isAlphaDigit('0xFF')).to.be.true;
    chai.expect(v.isAlphaDigit(NaN)).to.be.true;
    chai.expect(v.isAlphaDigit(Infinity)).to.be.true;
  });

  it('should return false for a non alpha and non digit string', function () {
    chai.expect(v.isAlphaDigit('Hello World!')).to.be.false;
    chai.expect(v.isAlphaDigit('Hello World! It is 2016.')).to.be.false;
    chai.expect(v.isAlphaDigit('\nHello World!\n')).to.be.false;
    chai.expect(v.isAlphaDigit('JavaScript 2015')).to.be.false;
    chai.expect(v.isAlphaDigit(' ')).to.be.false;
    chai.expect(v.isAlphaDigit('\n')).to.be.false;
    chai.expect(v.isAlphaDigit('\t')).to.be.false;
  });

  it('should return false for a non alpha and non digit russian string', function () {
    chai.expect(v.isAlphaDigit('привет мир!')).to.be.false;
    chai.expect(v.isAlphaDigit('Привет Мир! Это 2016')).to.be.false;
    chai.expect(v.isAlphaDigit('\nПривет-Мир\n')).to.be.false;
    chai.expect(v.isAlphaDigit('ЯваСкрипт 2015')).to.be.false;
  });

  it('should return false for a non alpha and non digit japanese string', function () {
    chai.expect(v.isAlphaDigit('こんにちは世界00!')).to.be.false;
    chai.expect(v.isAlphaDigit('ジャバスクリプト 2015(2016)')).to.be.false;
  });

  it('should return false for an array with a non alpha and non digit string item', function () {
    chai.expect(v.isAlphaDigit(['Hello World!'])).to.be.false;
    chai.expect(v.isAlphaDigit(['Ява Скрипт, привет!'])).to.be.false;
  });

  it('should return false for a non alpha and non digit string representation of an object', function () {
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'Hello World! How are you?';
      }
    })).to.be.false;
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'Ява Скрипт, Привет!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isAlphaDigit(undefined)).to.be.false;
    chai.expect(v.isAlphaDigit()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isAlphaDigit(null)).to.be.false;
  });

  it('should return false for a negative number or numeric string', function () {
    chai.expect(v.isAlphaDigit(-1)).to.be.false;
    chai.expect(v.isAlphaDigit(-12.05)).to.be.false;
    chai.expect(v.isAlphaDigit('-12.05')).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(v.isAlphaDigit('')).to.be.false;
  });
});

describe('isBlank', function () {

  it('should return false for a non empty string', function () {
    chai.expect(v.isBlank('Hello World!')).to.be.false;
    chai.expect(v.isBlank('a')).to.be.false;
  });

  it('should return false for a non empty string representation of an object', function () {
    chai.expect(v.isBlank(['Hello world'])).to.be.false;
    chai.expect(v.isBlank({
      toString: function toString() {
        return 'Welcome to New York';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isBlank(true)).to.be.false;
    chai.expect(v.isBlank(false)).to.be.false;
  });

  it('should return false for a number', function () {
    chai.expect(v.isBlank(0)).to.be.false;
    chai.expect(v.isBlank(100)).to.be.false;
    chai.expect(v.isBlank(-1.5)).to.be.false;
  });

  it('should return true for an empty string', function () {
    chai.expect(v.isBlank('')).to.be.true;
  });

  it('should return true for a string with whitespaces', function () {
    chai.expect(v.isBlank(' ')).to.be.true;
    chai.expect(v.isBlank('   ')).to.be.true;
    chai.expect(v.isBlank(' \n  ')).to.be.true;
    chai.expect(v.isBlank('\f\n\r\t\v')).to.be.true;
  });

  it('should return true for an empty string string representation of an object', function () {
    chai.expect(v.isBlank(['\n\n'])).to.be.true;
    chai.expect(v.isBlank({
      toString: function toString() {
        return ' ';
      }
    })).to.be.true;
  });

  it('should return true for an undefined', function () {
    chai.expect(v.isBlank(undefined)).to.be.true;
    chai.expect(v.isBlank()).to.be.true;
  });

  it('should return true for a null', function () {
    chai.expect(v.isBlank(null)).to.be.true;
  });
});

describe('isDigit', function () {

  it('should return true for a digit string', function () {
    chai.expect(v.isDigit('0')).to.be.true;
    chai.expect(v.isDigit('1000')).to.be.true;
    chai.expect(v.isDigit('1234567890')).to.be.true;
    chai.expect(v.isDigit('00')).to.be.true;
  });

  it('should return true for an array with one digit string item', function () {
    chai.expect(v.isDigit(['00'])).to.be.true;
    chai.expect(v.isDigit(['12'])).to.be.true;
    chai.expect(v.isDigit(['1234567890'])).to.be.true;
  });

  it('should return true for a digit string representation of an object', function () {
    chai.expect(v.isDigit({
      toString: function toString() {
        return '123';
      }
    })).to.be.true;
    chai.expect(v.isDigit({
      toString: function toString() {
        return '567';
      }
    })).to.be.true;
    chai.expect(v.isDigit({
      toString: function toString() {
        return '00';
      }
    })).to.be.true;
  });

  it('should return true for a positive integer number', function () {
    chai.expect(v.isDigit(0)).to.be.true;
    chai.expect(v.isDigit(1000)).to.be.true;
    chai.expect(v.isDigit(0xFF)).to.be.true;
    chai.expect(v.isDigit(Number.MAX_SAFE_INTEGER)).to.be.true;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isDigit(true)).to.be.false;
    chai.expect(v.isDigit(false)).to.be.false;
  });

  it('should return false for a non-digit string', function () {
    chai.expect(v.isDigit('hell0w0rld!')).to.be.false;
    chai.expect(v.isDigit('hello world! 12')).to.be.false;
    chai.expect(v.isDigit('\nhell0 w0rld!\n')).to.be.false;
    chai.expect(v.isDigit('JavaScript 2015')).to.be.false;
    chai.expect(v.isDigit('isAlpha(0)')).to.be.false;
    chai.expect(v.isDigit('привет0мир!1200')).to.be.false;
    chai.expect(v.isDigit('12.0')).to.be.false;
    chai.expect(v.isDigit('-1')).to.be.false;
  });

  it('should return false for an array with a non-digit string item', function () {
    chai.expect(v.isDigit(['Hello 1000000 visitor'])).to.be.false;
    chai.expect(v.isDigit(['0.0'])).to.be.false;
  });

  it('should return false for a non digit string representation of an object', function () {
    chai.expect(v.isDigit({
      toString: function toString() {
        return 'Hello World! 007';
      }
    })).to.be.false;
    chai.expect(v.isDigit({
      toString: function toString() {
        return 'Ява Скрипт, привет 0!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isDigit(undefined)).to.be.false;
    chai.expect(v.isDigit()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isDigit(null)).to.be.false;
  });

  it('should return false for a negative number or negative numeric string', function () {
    chai.expect(v.isDigit(-12)).to.be.false;
    chai.expect(v.isDigit(-100)).to.be.false;
    chai.expect(v.isDigit(-12.05)).to.be.false;
    chai.expect(v.isDigit('-1')).to.be.false;
    chai.expect(v.isDigit('-12.05')).to.be.false;
  });

  it('should return false for float numbers', function () {
    chai.expect(v.isDigit(0.5)).to.be.false;
    chai.expect(v.isDigit(12.05)).to.be.false;
    chai.expect(v.isDigit(100.001)).to.be.false;
  });

  it('should return false for an Infinity number', function () {
    chai.expect(v.isDigit(Infinity)).to.be.false;
  });

  it('should return false for a NaN number', function () {
    chai.expect(v.isDigit(NaN)).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(v.isDigit('')).to.be.false;
  });
});

describe('isEmpty', function () {

  it('should return true for an empty string', function () {
    chai.expect(v.isEmpty('')).to.be.true;
  });

  it('should return true for an undefined', function () {
    chai.expect(v.isEmpty(undefined)).to.be.true;
    chai.expect(v.isEmpty()).to.be.true;
  });

  it('should return true for a null', function () {
    chai.expect(v.isEmpty(null)).to.be.true;
  });

  it('should return false for a non empty string', function () {
    chai.expect(v.isEmpty('Hello World!')).to.be.false;
    chai.expect(v.isEmpty('a')).to.be.false;
    chai.expect(v.isEmpty(' ')).to.be.false;
  });

  it('should return false for a non empty string representation of an object', function () {
    chai.expect(v.isEmpty(['Hello world'])).to.be.false;
    chai.expect(v.isEmpty({
      toString: function toString() {
        return ' ';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isEmpty(true)).to.be.false;
    chai.expect(v.isEmpty(false)).to.be.false;
  });

  it('should return false for a number', function () {
    chai.expect(v.isEmpty(0)).to.be.false;
    chai.expect(v.isEmpty(100)).to.be.false;
    chai.expect(v.isEmpty(-1.5)).to.be.false;
  });
});

describe('isLowerCase', function () {

  it('should return true for a lower case string', function () {
    chai.expect(v.isLowerCase('a')).to.be.true;
    chai.expect(v.isLowerCase('helloworld')).to.be.true;
    chai.expect(v.isLowerCase('welcometoearth')).to.be.true;
    chai.expect(v.isLowerCase('приветземляне')).to.be.true;
    chai.expect(v.isLowerCase('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function () {
    chai.expect(v.isLowerCase(['robocop'])).to.be.true;
    chai.expect(v.isLowerCase({
      toString: function toString() {
        return 'batman';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function () {
    chai.expect(v.isLowerCase(true)).to.be.true;
    chai.expect(v.isLowerCase(false)).to.be.true;
  });

  it('should return false for a string containing upper case characters', function () {
    chai.expect(v.isLowerCase('Helloworld')).to.be.false;
    chai.expect(v.isLowerCase('WELCOMETOEARTH')).to.be.false;
    chai.expect(v.isLowerCase('ПриветЗемляне')).to.be.false;
  });

  it('should return false for a string containing characters different than lower case', function () {
    chai.expect(v.isLowerCase('hello world!')).to.be.false;
    chai.expect(v.isLowerCase('No one cared who I was until I put on the mask.')).to.be.false;
    chai.expect(v.isLowerCase('Привет, Земляне!')).to.be.false;
    chai.expect(v.isLowerCase('\n')).to.be.false;
    chai.expect(v.isLowerCase('\t')).to.be.false;
    chai.expect(v.isLowerCase(' ')).to.be.false;
    chai.expect(v.isLowerCase('')).to.be.false;
  });

  it('should return false for a non lower case string representation of an object', function () {
    chai.expect(v.isLowerCase(['RoboCop'])).to.be.false;
    chai.expect(v.isLowerCase({
      toString: function toString() {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function () {
    chai.expect(v.isLowerCase(0)).to.be.false;
    chai.expect(v.isLowerCase(-1500)).to.be.false;
    chai.expect(v.isLowerCase(2017)).to.be.false;
    chai.expect(v.isLowerCase('0')).to.be.false;
    chai.expect(v.isLowerCase('1998')).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isLowerCase(null)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isLowerCase(undefined)).to.be.false;
    chai.expect(v.isLowerCase()).to.be.false;
  });
});

describe('isNumeric', function () {

  it('should return true for a number', function () {
    chai.expect(v.isNumeric(0)).to.be.true;
    chai.expect(v.isNumeric(+0)).to.be.true;
    chai.expect(v.isNumeric(1000)).to.be.true;
    chai.expect(v.isNumeric(-1000)).to.be.true;
    chai.expect(v.isNumeric(0xFF)).to.be.true;
    chai.expect(v.isNumeric(1.56)).to.be.true;
    chai.expect(v.isNumeric(-10.888)).to.be.true;
    chai.expect(v.isNumeric(125e5)).to.be.true;
    chai.expect(v.isNumeric(125e-3)).to.be.true;
  });

  it('should return true for a numeric string', function () {
    chai.expect(v.isNumeric('0')).to.be.true;
    chai.expect(v.isNumeric('+0')).to.be.true;
    chai.expect(v.isNumeric('0.0')).to.be.true;
    chai.expect(v.isNumeric('1000')).to.be.true;
    chai.expect(v.isNumeric('-1000')).to.be.true;
    chai.expect(v.isNumeric('0xFF')).to.be.true;
    chai.expect(v.isNumeric('1.56')).to.be.true;
    chai.expect(v.isNumeric('-10.888')).to.be.true;
    chai.expect(v.isNumeric('125e5')).to.be.true;
    chai.expect(v.isNumeric('125e-3')).to.be.true;
  });

  it('should return true for a numeric string representation of an object', function () {
    chai.expect(v.isNumeric([0])).to.be.true;
    chai.expect(v.isNumeric(['0'])).to.be.true;
    chai.expect(v.isNumeric(['0.0'])).to.be.true;
    chai.expect(v.isNumeric({
      toString: function toString() {
        return '100';
      }
    })).to.be.true;
  });

  it('should return false for a non numeric string', function () {
    chai.expect(v.isNumeric('FF')).to.be.false;
    chai.expect(v.isNumeric('0FF')).to.be.false;
    chai.expect(v.isNumeric('Hello World!')).to.be.false;
    chai.expect(v.isNumeric('!0')).to.be.false;
    chai.expect(v.isNumeric('1.0 0')).to.be.false;
    chai.expect(v.isNumeric('Infinity')).to.be.false;
    chai.expect(v.isNumeric('NaN')).to.be.false;
    chai.expect(v.isNumeric(' ')).to.be.false;
  });

  it('should return false for a non numeric string representation of an object', function () {
    chai.expect(v.isNumeric(['Hello World!'])).to.be.false;
    chai.expect(v.isNumeric({
      toString: function toString() {
        return 'NaN';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isNumeric(true)).to.be.false;
    chai.expect(v.isNumeric(false)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isNumeric(undefined)).to.be.false;
    chai.expect(v.isNumeric()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isNumeric(null)).to.be.false;
  });

  it('should return false for an Inifinty', function () {
    chai.expect(v.isNumeric(null)).to.be.false;
  });

  it('should return false for a NaN', function () {
    chai.expect(v.isNumeric(null)).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(v.isNumeric('')).to.be.false;
  });
});

describe('isString', function () {

  it('should return true for a string', function () {
    chai.expect(v.isString('Hello World!')).to.be.true;
    chai.expect(v.isString('')).to.be.true;
    chai.expect(v.isString('\n')).to.be.true;
  });

  it('should return false for a null', function () {
    chai.expect(v.isString(null)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isString(undefined)).to.be.false;
    chai.expect(v.isString()).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isString(true)).to.be.false;
    chai.expect(v.isString(false)).to.be.false;
  });

  it('should return false for a number', function () {
    chai.expect(v.isString(100)).to.be.false;
    chai.expect(v.isString(-40)).to.be.false;
  });

  it('should return false for an object', function () {
    chai.expect(v.isString([])).to.be.false;
    chai.expect(v.isString({})).to.be.false;
    chai.expect(v.isString(new Date())).to.be.false;
  });
});

describe('isUpperCase', function () {

  it('should return true for an upper case string', function () {
    chai.expect(v.isUpperCase('A')).to.be.true;
    chai.expect(v.isUpperCase('HELLOWORLD')).to.be.true;
    chai.expect(v.isUpperCase('WELCOMETOEARTH')).to.be.true;
    chai.expect(v.isUpperCase('ПРИВЕТЗЕМЛЯНЕ')).to.be.true;
    chai.expect(v.isUpperCase('ÁÉÈÊËÍÎÏÓÔÚÛÝÀÒÜÇÄÖÂÙŸÃÕÑ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function () {
    chai.expect(v.isUpperCase(['ROBOCOP'])).to.be.true;
    chai.expect(v.isUpperCase({
      toString: function toString() {
        return 'BATMAN';
      }
    })).to.be.true;
  });

  it('should return false for a string containing lower case characters', function () {
    chai.expect(v.isUpperCase('Helloworld')).to.be.false;
    chai.expect(v.isUpperCase('WeLCOMETOEARTH')).to.be.false;
    chai.expect(v.isUpperCase('ПриветЗемляне')).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isUpperCase(true)).to.be.false;
    chai.expect(v.isUpperCase(false)).to.be.false;
  });

  it('should return false for a string containing characters different than upper case', function () {
    chai.expect(v.isUpperCase('hello world!')).to.be.false;
    chai.expect(v.isUpperCase('No one cared who I was until I put on the mask.')).to.be.false;
    chai.expect(v.isUpperCase('Привет, Земляне!')).to.be.false;
    chai.expect(v.isUpperCase('\n')).to.be.false;
    chai.expect(v.isUpperCase('\t')).to.be.false;
    chai.expect(v.isUpperCase(' ')).to.be.false;
    chai.expect(v.isUpperCase('')).to.be.false;
  });

  it('should return false for a non upper case string representation of an object', function () {
    chai.expect(v.isUpperCase(['RoboCop'])).to.be.false;
    chai.expect(v.isUpperCase({
      toString: function toString() {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function () {
    chai.expect(v.isUpperCase(0)).to.be.false;
    chai.expect(v.isUpperCase(-1500)).to.be.false;
    chai.expect(v.isUpperCase(2017)).to.be.false;
    chai.expect(v.isUpperCase('0')).to.be.false;
    chai.expect(v.isUpperCase('1998')).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isUpperCase(null)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isUpperCase(undefined)).to.be.false;
    chai.expect(v.isUpperCase()).to.be.false;
  });
});

describe('startsWith', function () {

  it('should return true for a valid starting string', function () {
    chai.expect(v.startsWith('Hello World!', '')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'H')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'He')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hel')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hell')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello ')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello W')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello Wo')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello Wor')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello Worl')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello World')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello World!')).to.be.true;
    chai.expect(v.startsWith('Привет Мир!', 'Привет')).to.be.true;
    chai.expect(v.startsWith('', '')).to.be.true;
  });

  it('should return true for a valid starting string and position', function () {
    chai.expect(v.startsWith('Hello World!', '', 0)).to.be.true;
    chai.expect(v.startsWith('Hello World!', '!', 'Hello World!'.length - 1)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'd!', 'Hello World!'.length - 2)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'ld!', 'Hello World!'.length - 3)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'rld!', 'Hello World!'.length - 4)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'orld!', 'Hello World!'.length - 5)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'World!', 'Hello World!'.length - 6)).to.be.true;
    chai.expect(v.startsWith('Hello World!', ' World!', 'Hello World!'.length - 7)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'o World!', 'Hello World!'.length - 8)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'lo World!', 'Hello World!'.length - 9)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'llo World!', 'Hello World!'.length - 10)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'ello World!', 'Hello World!'.length - 11)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello World!', 0)).to.be.true;
    chai.expect(v.startsWith('', '', 0)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello', NaN)).to.be.true;
  });

  it('should return true for a correct downcast of the position', function () {
    chai.expect(v.startsWith('Hello World!', 'ello', '1')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'ello', 1.1)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello', -1)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello', -Infinity)).to.be.true;
  });

  it('should return true for an empty starting string', function () {
    [0, 1, 100, Infinity, undefined, NaN, null].forEach(function (position) {
      chai.expect(v.startsWith('Hello World!', '', position)).to.be.true;
    });
  });

  it('should return true for a valid starting as a number', function () {
    chai.expect(v.startsWith(1000, 100)).to.be.true;
    chai.expect(v.startsWith(1250, 12)).to.be.true;
    chai.expect(v.startsWith('916', 91)).to.be.true;
  });

  it('should return true for a valid ending in a string representation of an object', function () {
    chai.expect(v.startsWith(['Welcome to Earth'], 'Welcome')).to.be.true;
    chai.expect(v.startsWith({
      toString: function toString() {
        return 'Let us not stand on ceremony, Mr. Wayne.';
      }
    }, ['Let us not stand on ceremony'])).to.be.true;
  });

  it('should return false for an invalid starting string', function () {
    chai.expect(v.startsWith('The shadows betray you, because they belong to me!', 'belong to me!')).to.be.false;
    chai.expect(v.startsWith('The shadows betray you, because they belong to me!', 'he shadows')).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'hey belong to me!')).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'belong')).to.be.false;
    chai.expect(v.startsWith('', 'The shadows')).to.be.false;
  });

  it('should return false for an invalid starting string and position', function () {
    chai.expect(v.startsWith('The shadows betray you, because they belong to me!', 'The shadows betray you', 1)).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'They belong to me!', 1)).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'They', 1)).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'belong', 2)).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'to me!', 3)).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'They belong', 100)).to.be.false;
  });

  it('should return false for an invalid starting number', function () {
    chai.expect(v.startsWith(1000, 11)).to.be.false;
    chai.expect(v.startsWith(1250, 10)).to.be.false;
    chai.expect(v.startsWith('916', 90)).to.be.false;
  });

  it('should return false for undefined and null parameters', function () {
    chai.expect(v.startsWith()).to.be.false;
    chai.expect(v.startsWith(undefined)).to.be.false;
    chai.expect(v.startsWith(undefined, undefined)).to.be.false;
    chai.expect(v.startsWith(undefined, undefined, undefined)).to.be.false;
    chai.expect(v.startsWith(undefined, undefined, 0)).to.be.false;
    chai.expect(v.startsWith(undefined, 'Hello World!')).to.be.false;
    chai.expect(v.startsWith(null)).to.be.false;
    chai.expect(v.startsWith(null, null)).to.be.false;
    chai.expect(v.startsWith(null, null, null)).to.be.false;
    chai.expect(v.startsWith(null, null, 0)).to.be.false;
    chai.expect(v.startsWith(null, 'Hello World!')).to.be.false;
  });
});

describe('trim', function () {

  it('should return the trimmed string with default whitespaces', function () {
    chai.expect(v.trim(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
  });

  it('should return the trimmed string with custom whitespaces', function () {
    chai.expect(v.trim('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trim('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?');
    chai.expect(v.trim('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trim('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trim('***Do you *feel* in charge?***', '**')).to.be.equal('*Do you *feel* in charge?*');
    chai.expect(v.trim('Do you *feel* in charge?', 'Do you *feel* in charge?')).to.be.equal('');
    chai.expect(v.trim('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function () {
    chai.expect(v.trim('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    chai.expect(v.trim('', '')).to.be.equal('');
  });

  it('should return the trimmed string representation of an object', function () {
    chai.expect(v.trim([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim({
      toString: function toString() {
        return '\n\nYes. The fire rises.';
      }
    })).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim(['****You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the trimmed string for numbers', function () {
    chai.expect(v.trim(100, 1)).to.be.equal('00');
    chai.expect(v.trim(6780, 6780)).to.be.equal('');
    chai.expect(v.trim(-115, -1)).to.be.equal('15');
    chai.expect(v.trim(1111, 1)).to.be.equal('');
    chai.expect(v.trim(8998, 8)).to.be.equal('99');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.trim(null)).to.be.equal('');
    chai.expect(v.trim(null, '\n')).to.be.equal('');
    chai.expect(v.trim(null, null)).to.be.equal('');
    chai.expect(v.trim(undefined)).to.be.equal('');
    chai.expect(v.trim(undefined, '*')).to.be.equal('');
    chai.expect(v.trim(undefined, undefined)).to.be.equal('');
  });
});

describe('trimLeft', function () {

  it('should return the left trimmed string with default whitespaces', function () {
    chai.expect(v.trimLeft(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.    ');
    chai.expect(v.trimLeft('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
  });

  it('should return the left trimmed string with custom whitespaces', function () {
    chai.expect(v.trimLeft('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?-');
    chai.expect(v.trimLeft('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?---');
    chai.expect(v.trimLeft('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?___');
    chai.expect(v.trimLeft('___Do you *feel* in charge?', '_')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trimLeft('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trimLeft('***Do you *feel* in charge?***', '**')).to.be.equal('*Do you *feel* in charge?***');
    chai.expect(v.trimLeft('Do you *feel* in charge?', 'Do you *feel* in charge?')).to.be.equal('');
    chai.expect(v.trimLeft('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function () {
    chai.expect(v.trimLeft('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    chai.expect(v.trimLeft('', '')).to.be.equal('');
  });

  it('should return the left trimmed string representation of an object', function () {
    chai.expect(v.trimLeft([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft({
      toString: function toString() {
        return '\n\nYes. The fire rises.';
      }
    })).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft(['****You\'re a big guy!'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the left trimmed string for numbers', function () {
    chai.expect(v.trimLeft(100, 1)).to.be.equal('00');
    chai.expect(v.trimLeft(6780, 6780)).to.be.equal('');
    chai.expect(v.trimLeft(-115, -1)).to.be.equal('15');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.trimLeft(null)).to.be.equal('');
    chai.expect(v.trimLeft(null, '\n')).to.be.equal('');
    chai.expect(v.trimLeft(null, null)).to.be.equal('');
    chai.expect(v.trimLeft(undefined)).to.be.equal('');
    chai.expect(v.trimLeft(undefined, '*')).to.be.equal('');
    chai.expect(v.trimLeft(undefined, undefined)).to.be.equal('');
  });
});

describe('trimRight', function () {

  it('should return the right trimmed string with default whitespaces', function () {
    chai.expect(v.trimRight('Yes. The fire rises. ')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight('Yes. The fire rises.   ')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight('   Yes. The fire rises.    ')).to.be.equal('   Yes. The fire rises.');
    chai.expect(v.trimRight('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight('Yes. The fire rises.\n\f\t ')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight('Yes. The fire rises.\n\f\t ', null)).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight('Yes. The fire rises.\n\f\t ', undefined)).to.be.equal('Yes. The fire rises.');
  });

  it('should return the right trimmed string with custom whitespaces', function () {
    chai.expect(v.trimRight('-Do you *feel* in charge?-', '-')).to.be.equal('-Do you *feel* in charge?');
    chai.expect(v.trimRight('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('---Do-you-*feel*-in-charge?');
    chai.expect(v.trimRight('___Do you *feel* in charge?', '_')).to.be.equal('___Do you *feel* in charge?');
    chai.expect(v.trimRight('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trimRight('Do you *feel* in charge?<-', '<-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trimRight('***Do you *feel* in charge?***', '**')).to.be.equal('***Do you *feel* in charge?*');
    chai.expect(v.trimRight('Do you *feel* in charge?', 'Do you *feel* in charge?')).to.be.equal('');
    chai.expect(v.trimRight('Do you *feel* in charge?\n\n', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function () {
    chai.expect(v.trimRight('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    chai.expect(v.trimRight('', '')).to.be.equal('');
  });

  it('should return the right trimmed string representation of an object', function () {
    chai.expect(v.trimRight(['Yes. The fire rises. '])).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight({
      toString: function toString() {
        return 'Yes. The fire rises.\n\n';
      }
    })).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight(['You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the right trimmed string for numbers', function () {
    chai.expect(v.trimRight(100, 0)).to.be.equal('1');
    chai.expect(v.trimRight(6780, 6780)).to.be.equal('');
    chai.expect(v.trimRight(-115, 15)).to.be.equal('-1');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.trimRight(null)).to.be.equal('');
    chai.expect(v.trimRight(null, '\n')).to.be.equal('');
    chai.expect(v.trimRight(null, null)).to.be.equal('');
    chai.expect(v.trimRight(undefined)).to.be.equal('');
    chai.expect(v.trimRight(undefined, '*')).to.be.equal('');
    chai.expect(v.trimRight(undefined, undefined)).to.be.equal('');
  });
});
//# sourceMappingURL=test-bundle.js.map