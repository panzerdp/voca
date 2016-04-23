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
 * Counts the characters in `subject`. Equivalent to `subject.length`.
 *
 * @function length
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @return {int} Returns the number of characters in `subject`.
 * @example
 * v.length('rain');
 * // => 4
 */
function length (subject) {
  return toString(nilDefault(subject, '')).length;
}

/**
 * Regular expression to match combining marks
 *
 * @see http://unicode.org/faq/char_combmark.html
 * @type {RegExp}
 * @ignore
 */
var REGEXP_COMBINING_MARKS = /([\0-\u02FF\u0370-\u1AAF\u1B00-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uE000-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])([\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g;

/**
 * Regular expression to match surrogate pairs
 *
 * @see http://www.unicode.org/faq/utf_bom.html#utf16-2
 * @type {RegExp}
 * @ignore
 */
var REGEXP_SURROGATE_PAIRS = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;

/**
 * Regular expression to match whitespaces from the left side
 *
 * @type {RegExp}
 * @ignore
 */
var REGEX_TRIM_LEFT = /^[\s\uFEFF\xA0]+/;

/**
 * Regular expression to match whitespaces from the right side
 *
 * @type {RegExp}
 * @ignore
 */
var REGEX_TRIM_RIGHT = /[\s\uFEFF\xA0]+$/;

/**
 * Regular expression to match alpha characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA = /^[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+$/;

/**
 * Regular expression to match alpha and digit characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA_DIGIT = /^[\d\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+$/;

/**
 * Regular expression to match digit characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_DIGIT = /^\d+$/;

/**
 * Regular expression to match non basic latin characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_NOT_BASIC_LATIN = /[^\u0000-\u007E]/g;

/**
 * Counts the characters in `subject` taking care of
 * <a href="http://www.unicode.org/faq/utf_bom.html#utf16-2">surrogate pairs</a> and
 * <a href="http://unicode.org/faq/char_combmark.html">combining marks</a>.
 *
 * @function lengthCodePoint
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @return {int} Returns the number of characters in `subject`.
 * @example
 * v.lengthCodePoint('rain');
 * // => 4
 *
 * v.lengthCodePoint('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => 2
 *
 * v.lengthCodePoint('cafe\u0301'); // or 'café'
 * // => 4
 */
function lengthCodePoint (subject) {
  return toString(nilDefault(subject, '')).replace(REGEXP_COMBINING_MARKS, '*').replace(REGEXP_SURROGATE_PAIRS, '*').length;
}

/**
 * Counts the characters in `subject` where `predicate` returns truthy.
 *
 * @function lengthWhere
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @param {Function} predicate The predicate function invoked on each character with parameters `(character, index, string)`.
 * @param {Object} [context] The context to invoke the `predicate`.
 * @return {int} Returns the number of characters.
 * @example
 * v.lengthWhere('hola!', v.isAlpha);
 * // => 4
 *
 * v.lengthWhere('2022', function(character, index, str) {
 *   return character === '2';
 * });
 * // => 3
 */
function lengthWhere (subject, predicate, context) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '' || typeof predicate !== 'function') {
    return 0;
  }
  return Array.prototype.reduce.call(subjectString, function (count, character, index) {
    if (predicate.call(context, character, index, subjectString)) {
      count++;
    }
    return count;
  }, 0);
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
  return REGEXP_ALPHA.test(subjectString);
}

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
  return REGEXP_ALPHA_DIGIT.test(subjectString);
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
  return REGEXP_DIGIT.test(subjectString);
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
 * Checks if `subject` has only lower case characters.
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
 * Checks if `subject` has only upper case characters.
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
 * Converts the `value` to a boolean.
 *
 * @ignore
 * @function toBoolean
 * @param {*} value The value to convert.
 * @return {boolean} Returns `true` if `value` is truthy or `false` otherwise.
 */
function toBoolean (value) {
  return !!value;
}

/**
 * Converts the first character of `subject` to upper case and the rest to lower case.
 *
 * @function capitalize
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to capitalize.
 * @param {boolean} [restToLowerCase=false] Convert the rest of `subject` to lower case.
 * @return {string} Returns the capitalized string.
 * @example
 * v.capitalize('APPLE');
 * // => 'Apple'
 *
 * v.capitalize('mAC', false);
 * // => 'MAC'
 */
function capitalize (subject, restToLowerCase) {
  var subjectString = toString(nilDefault(subject, '')),
      restToLowerCaseBoolean = toBoolean(nilDefault(restToLowerCase, false));
  if (subjectString === '') {
    return subjectString;
  }
  if (restToLowerCaseBoolean) {
    subjectString = subjectString.toLowerCase();
  }
  return subjectString.substr(0, 1).toUpperCase() + subjectString.substr(1);
}

/**
 * Converts the first character of `subject` to lower case.
 *
 * @function decapitalize
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to decapitalize.
 * @return {string} Returns the decapitalized string.
 * @example
 * v.decapitalize('Sun');
 * // => 'sun'
 */
function decapitalize (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.substr(0, 1).toLowerCase() + subjectString.substr(1);
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
  "ｚ": "z"
};

/**
 * Removes the diacritics from `character`.
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
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to latinise.
 * @return {string} Returns the latinised string.
 * @example
 * v.latinise('cafe\u0301'); // or 'café'
 * // => 'cafe'
 *
 * v.latinise('août décembre');
 * // => 'aout decembre'
 */
function latinise (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.replace(REGEXP_NOT_BASIC_LATIN, removeDiacritics).replace(REGEXP_COMBINING_MARKS, removeCombiningMarks);
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
function reverse (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.split('').reverse().join('');
}

/**
 * Reverse the `subject` taking care of
 * <a href="http://www.unicode.org/faq/utf_bom.html#utf16-2">surrogate pairs</a> and
 * <a href="http://unicode.org/faq/char_combmark.html">combining marks</a>.
 *
 * @function reverseCodePoint
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverseCodePoint('summer');
 * // => 'remmus'
 *
 * v.reverseCodePoint('𝌆 bar mañana mañana');
 * // => 'anañam anañam rab 𝌆'
 */
function reverseCodePoint(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  // @see https://github.com/mathiasbynens/esrever
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
 * Extracts from `subject` a string from `start` position to `end` position.
 *
 * @function slice
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {int} start The position to start extraction. If negative use `subject.length + start`.
 * @param {int} [end=subject.length] The position to end extraction. If negative use `subject.length + end`.
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
 * @param {int} start The position to start extraction.
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
 * Extract from `subject` a string from `start` position to `end` position.
 *
 * @function substring
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {int} start The position to start extraction.
 * @param {int} [end=subject.length] The position to end extraction.
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
  length: length,
  lengthCodePoint: lengthCodePoint,
  lengthWhere: lengthWhere,

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

  decapitalize: decapitalize,
  capitalize: capitalize,
  latinise: latinise,
  repeat: repeat,
  reverseCodePoint: reverseCodePoint,
  reverse: reverse,
  slice: slice,
  substr: substr,
  substring: substring,
  trim: trim,
  trimLeft: trimLeft,
  trimRight: trimRight
};

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
var REVERSED_PRINTABLE_ASCII = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

describe('length', function () {

  it('should return the number of characters in a string', function () {
    chai.expect(v.length('rain')).to.be.equal(4);
    chai.expect(v.length('')).to.be.equal(0);
    chai.expect(v.length('rainbow')).to.be.equal(7);
    chai.expect(v.length(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function () {
    chai.expect(v.length(123)).to.be.equal(3);
    chai.expect(v.length(0)).to.be.equal(1);
    chai.expect(v.length(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function () {
    chai.expect(v.length(['droplet'])).to.be.equal(7);
    chai.expect(v.length({
      toString: function toString() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function () {
    chai.expect(v.length()).to.be.equal(0);
    chai.expect(v.length(null)).to.be.equal(0);
    chai.expect(v.length(undefined)).to.be.equal(0);
  });
});

describe('lengthCodePoint', function () {

  it('should return the number of characters in a string', function () {
    chai.expect(v.lengthCodePoint('rain')).to.be.equal(4);
    chai.expect(v.lengthCodePoint('')).to.be.equal(0);
    chai.expect(v.lengthCodePoint('rainbow')).to.be.equal(7);
    chai.expect(v.lengthCodePoint('é⃝')).to.be.equal(1);
    chai.expect(v.lengthCodePoint('𝐀𝐁')).to.be.equal(2);
    chai.expect(v.lengthCodePoint('mañana')).to.be.equal(6);
    chai.expect(v.lengthCodePoint('café')).to.be.equal(4);
    chai.expect(v.lengthCodePoint('foõ͜͝͞bar')).to.be.equal(6);
    chai.expect(v.lengthCodePoint('foo𝌆̃͜͝͞bar')).to.be.equal(7);
    chai.expect(v.lengthCodePoint(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function () {
    chai.expect(v.lengthCodePoint(123)).to.be.equal(3);
    chai.expect(v.lengthCodePoint(0)).to.be.equal(1);
    chai.expect(v.lengthCodePoint(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function () {
    chai.expect(v.lengthCodePoint(['droplet'])).to.be.equal(7);
    chai.expect(v.lengthCodePoint({
      toString: function toString() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function () {
    chai.expect(v.lengthCodePoint()).to.be.equal(0);
    chai.expect(v.lengthCodePoint(null)).to.be.equal(0);
    chai.expect(v.lengthCodePoint(undefined)).to.be.equal(0);
  });
});

describe('lengthWhere', function () {

  it('should return the number of characters in a string for a predicate', function () {
    chai.expect(v.lengthWhere('', v.isAlpha)).to.be.equal(0);
    chai.expect(v.lengthWhere('africa654', v.isAlpha)).to.be.equal(6);
    chai.expect(v.lengthWhere('790', v.isAlpha)).to.be.equal(0);
    chai.expect(v.lengthWhere(PRINTABLE_ASCII, v.isDigit)).to.be.equal(10);
    chai.expect(v.lengthWhere('****--**--**', function (character) {
      return character === '*';
    })).to.be.equal(8);
    chai.expect(v.lengthWhere('****--**--**', function () {
      return false;
    })).to.be.equal(0);
  });

  it('should invoke the predicate with correct parameters and context', function () {
    var verifyIndex = 0,
        context = {},
        verifyString = '0123456789';
    chai.expect(v.lengthWhere(verifyString, function (character, index, string) {
      chai.expect(index).to.be.equal(verifyIndex);
      chai.expect(this).to.be.equal(context);
      chai.expect(string).to.be.equal(verifyString);
      chai.expect(character).to.be.equal(verifyString[verifyIndex]);
      verifyIndex++;
      return true;
    }, context)).to.be.equal(10);
  });

  it('should return the number of characters in a number for a predicate', function () {
    chai.expect(v.lengthWhere(123, v.isDigit)).to.be.equal(3);
    chai.expect(v.lengthWhere(0, v.isDigit)).to.be.equal(1);
    chai.expect(v.lengthWhere(-1.5, v.isDigit)).to.be.equal(2);
  });

  it('should return the number of characters in a string representation of an object for a predicate', function () {
    chai.expect(v.lengthWhere(['droplet'], v.isDigit)).to.be.equal(0);
    chai.expect(v.lengthWhere({
      toString: function toString() {
        return 'homo sapiens';
      }
    }, v.isAlphaDigit)).to.be.equal(11);
  });

  it('should return zero for a non function predicate', function () {
    chai.expect(v.lengthWhere('africa')).to.be.equal(0);
    chai.expect(v.lengthWhere('africa', undefined)).to.be.equal(0);
    chai.expect(v.lengthWhere('africa', null)).to.be.equal(0);
    chai.expect(v.lengthWhere('africa', 'africa')).to.be.equal(0);
    chai.expect(v.lengthWhere('africa', 0)).to.be.equal(0);
    chai.expect(v.lengthWhere()).to.be.equal(0);
  });
});

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

describe('includes', function () {

  it('should return true for an included string', function () {
    chai.expect(v.includes('mobile infantry', 'mobile')).to.be.true;
    chai.expect(v.includes('mobile infantry', 'infantry')).to.be.true;
    chai.expect(v.includes('mobile infantry', 'mobile infantry')).to.be.true;
    chai.expect(v.includes('mobile infantry', ' ')).to.be.true;
    chai.expect(v.includes('mobile infantry', '')).to.be.true;
    chai.expect(v.includes('', '')).to.be.true;
    chai.expect(v.includes(undefined, '')).to.be.true;
    chai.expect(v.includes('\nwelcome', '\n')).to.be.true;
  });

  it('should return true for an included string and position', function () {
    chai.expect(v.includes('mobile infantry', 'mobile', 0)).to.be.true;
    chai.expect(v.includes('mobile infantry', 'infantry', 7)).to.be.true;
    chai.expect(v.includes('mobile infantry', 'mobile infantry', 0)).to.be.true;
    chai.expect(v.includes('mobile infantry', ' ', 6)).to.be.true;
    chai.expect(v.includes('mobile infantry', '', 0)).to.be.true;
    chai.expect(v.includes('mobile infantry', '', 6)).to.be.true;
    chai.expect(v.includes('', '', 0)).to.be.true;
    chai.expect(v.includes('', '', 6)).to.be.true;
  });

  it('should return true for an included string representation of an object', function () {
    chai.expect(v.includes(['mobile infantry'], 'mobile')).to.be.true;
    chai.expect(v.includes({
      toString: function toString() {
        return 'mobile infantry';
      }
    }, 'infantry')).to.be.true;
    chai.expect(v.includes(['mobile infantry'], ['mobile infantry'])).to.be.true;
  });

  it('should return true for an included number', function () {
    chai.expect(v.includes(155, 55));
    chai.expect(v.includes('1078', 78));
    chai.expect(v.includes(0, 0));
    chai.expect(v.includes(80, ''));
  });

  it('should return false for a not included string', function () {
    chai.expect(v.includes('mobile infantry', 'be mobile')).to.be.false;
    chai.expect(v.includes('mobile infantry', 'infantry ')).to.be.false;
    chai.expect(v.includes('mobile infantry', ' mobile infantry ')).to.be.false;
    chai.expect(v.includes('mobile infantry', '!')).to.be.false;
    chai.expect(v.includes('', 'mobile')).to.be.false;
    chai.expect(v.includes('\nwelcome', '\t')).to.be.false;
  });

  it('should return false for a not included string and position', function () {
    chai.expect(v.includes('mobile infantry', 'mobile', 1)).to.be.false;
    chai.expect(v.includes('mobile infantry', 'infantry', 8)).to.be.false;
    chai.expect(v.includes('mobile infantry', 'mobile infantry', 2)).to.be.false;
    chai.expect(v.includes('mobile infantry', ' ', 7)).to.be.false;
  });

  it('should return false for a not included string representation of an object', function () {
    chai.expect(v.includes(['mobile infantry'], 'mobile number')).to.be.false;
    chai.expect(v.includes({
      toString: function toString() {
        return 'mobile infantry';
      }
    }, 'motorized infantry')).to.be.false;
    chai.expect(v.includes(['mobile infantry'], ['mobile infantry'], 1)).to.be.false;
  });

  it('should return false for a undefined or null search string', function () {
    chai.expect(v.includes('mobile infantry', undefined)).to.be.false;
    chai.expect(v.includes('mobile infantry', null)).to.be.false;
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

describe('matches', function () {

  it('should return true for a string that matches a regular expression object', function () {
    chai.expect(v.matches('pacific ocean', /ocean/)).to.be.true;
    chai.expect(v.matches('pacific ocean', /^pacific ocean$/)).to.be.true;
    chai.expect(v.matches(undefined, /.?/)).to.be.true;
    chai.expect(v.matches(null, /.?/)).to.be.true;
  });

  it('should return true for a string that matches a regular expression string', function () {
    chai.expect(v.matches('pacific ocean', 'ocean')).to.be.true;
    chai.expect(v.matches('pacific ocean', '^pacific ocean$')).to.be.true;
    chai.expect(v.matches('pacific ocean', 'PACIFIC', 'i')).to.be.true;
    chai.expect(v.matches('pacific ocean', '\\s')).to.be.true;
    chai.expect(v.matches(undefined, '.?')).to.be.true;
    chai.expect(v.matches(null, '.?')).to.be.true;
  });

  it('should return true for a string that matches a string representation of an object', function () {
    chai.expect(v.matches(['atlantic ocean'], /atlantic/)).to.be.true;
    chai.expect(v.matches('pacific ocean', ['^pacific ocean$'])).to.be.true;
    chai.expect(v.matches({
      toString: function toString() {
        return 'pacific ocean';
      }
    }, 'PACIFIC', 'i')).to.be.true;
    chai.expect(v.matches(['pacific ocean'], ['\\s'])).to.be.true;
  });

  it('should return true for a number that matches a regular expression', function () {
    chai.expect(v.matches(1500, /\d/)).to.be.true;
    chai.expect(v.matches(685, 68)).to.be.true;
    chai.expect(v.matches(-1.5, /^\-1\.5$/)).to.be.true;
  });

  it('should return true for a boolean that matches a regular expression', function () {
    chai.expect(v.matches(true, /true/)).to.be.true;
    chai.expect(v.matches(false, 'false')).to.be.true;
  });

  it('should return false for a string that does not match a regular expression object', function () {
    chai.expect(v.matches('pacific ocean', /^ocean/)).to.be.false;
    chai.expect(v.matches('pacific ocean', /^atlantic ocean$/)).to.be.false;
    chai.expect(v.matches(undefined, /a/)).to.be.false;
  });

  it('should return false for a string that does not match a regular expression string', function () {
    chai.expect(v.matches('pacific ocean', 'sea')).to.be.false;
    chai.expect(v.matches('pacific ocean', '^atlantic ocean$')).to.be.false;
    chai.expect(v.matches('pacific ocean', 'PACIFIC')).to.be.false;
    chai.expect(v.matches('pacific ocean', '\\n')).to.be.false;
    chai.expect(v.matches(undefined, '\s')).to.be.false;
  });

  it('should return false for a null or undefined pattern', function () {
    chai.expect(v.matches('pacific ocean', undefined)).to.be.false;
    chai.expect(v.matches('pacific ocean', null)).to.be.false;
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

describe('decapitalize', function () {

  it('should decapitalize the first character in a string', function () {
    chai.expect(v.decapitalize('Light')).to.be.equal('light');
    chai.expect(v.decapitalize('light')).to.be.equal('light');
    chai.expect(v.decapitalize('Sun')).to.be.equal('sun');
    chai.expect(v.decapitalize('f')).to.be.equal('f');
    chai.expect(v.decapitalize('')).to.be.equal('');
    chai.expect(v.decapitalize('*light')).to.be.equal('*light');
    chai.expect(v.decapitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should decapitalize the first character in a string representation of an object', function () {
    chai.expect(v.decapitalize(['Fruit'])).to.be.equal('fruit');
    chai.expect(v.decapitalize({
      toString: function toString() {
        return 'CaRrOt';
      }
    }, false)).to.be.equal('caRrOt');
  });

  it('should not modify numbers', function () {
    chai.expect(v.decapitalize(100)).to.be.equal('100');
    chai.expect(v.decapitalize(812, false)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.decapitalize()).to.be.equal('');
    chai.expect(v.decapitalize(undefined)).to.be.equal('');
    chai.expect(v.decapitalize(null)).to.be.equal('');
  });
});

describe('capitalize', function () {

  it('should capitalize the first character in a string', function () {
    chai.expect(v.capitalize('APPLE')).to.be.equal('APPLE');
    chai.expect(v.capitalize('apple')).to.be.equal('Apple');
    chai.expect(v.capitalize('macBook')).to.be.equal('MacBook');
    chai.expect(v.capitalize('f')).to.be.equal('F');
    chai.expect(v.capitalize('')).to.be.equal('');
    chai.expect(v.capitalize('*apple')).to.be.equal('*apple');
    chai.expect(v.capitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should capitalize the first character in a string and keep the rest unmodified', function () {
    chai.expect(v.capitalize('apple', true)).to.be.equal('Apple');
    chai.expect(v.capitalize('APPLE', true)).to.be.equal('Apple');
    chai.expect(v.capitalize('яблоко', true)).to.be.equal('Яблоко');
    chai.expect(v.capitalize('f', true)).to.be.equal('F');
    chai.expect(v.capitalize('', true)).to.be.equal('');
    chai.expect(v.capitalize('100', true)).to.be.equal('100');
    chai.expect(v.capitalize('  ', true)).to.be.equal('  ');
  });

  it('should capitalize the first character in a string representation of an object', function () {
    chai.expect(v.capitalize(['grape'])).to.be.equal('Grape');
    chai.expect(v.capitalize({
      toString: function toString() {
        return 'oRaNgE';
      }
    }, false)).to.be.equal('ORaNgE');
  });

  it('should not modify numbers', function () {
    chai.expect(v.capitalize(100)).to.be.equal('100');
    chai.expect(v.capitalize(812, false)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.capitalize()).to.be.equal('');
    chai.expect(v.capitalize(undefined)).to.be.equal('');
    chai.expect(v.capitalize(null)).to.be.equal('');
    chai.expect(v.capitalize(undefined, true)).to.be.equal('');
    chai.expect(v.capitalize(undefined, false)).to.be.equal('');
  });
});

describe('latinise', function () {

  it('should latinise the first character in a string', function () {
    chai.expect(v.latinise('')).to.be.equal('');
    chai.expect(v.latinise('moldova')).to.be.equal('moldova');
    chai.expect(v.latinise('café')).to.be.equal('cafe');
    chai.expect(v.latinise('ma\xF1ana')).to.be.equal('manana');
    chai.expect(v.latinise('mañana')).to.be.equal('manana');
    chai.expect(v.latinise('foõ͜͝͞bar')).to.be.equal('foobar');
    chai.expect(v.latinise('café')).to.be.equal('cafe');
    chai.expect(v.latinise('colecção cópias críticos é tão')).to.be.equal('coleccao copias criticos e tao');
    chai.expect(v.latinise('književnošću čuvanje')).to.be.equal('knjizevnoscu cuvanje');
    chai.expect(v.latinise('anglikonų šiurkščios užrašinėti')).to.be.equal('anglikonu siurkscios uzrasineti');
    chai.expect(v.latinise('Schuß für Pfarrerstöchter')).to.be.equal('Schus fur Pfarrerstochter');
    chai.expect(v.latinise('publicó éxito nació María')).to.be.equal('publico exito nacio Maria');
    chai.expect(v.latinise('Charlotte Brontë')).to.be.equal('Charlotte Bronte');
    chai.expect(v.latinise('vecākā no māsām Brontē')).to.be.equal('vecaka no masam Bronte');
    chai.expect(v.latinise('Şarlotta Brontenin özü')).to.be.equal('Sarlotta Brontenin ozu');
    chai.expect(v.latinise('Wkrótce po ślubie pisarka zaszła w ciążę')).to.be.equal('Wkrotce po slubie pisarka zaszla w ciaze');
    chai.expect(v.latinise("Dès l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencée par certaines sources d'inspiration")).to.be.equal("Des l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencee par certaines sources d'inspiration");
    chai.expect(v.latinise('Există peste 13.800 de localități în România')).to.be.equal('Exista peste 13.800 de localitati in Romania');
    chai.expect(v.latinise('août décembre')).to.be.equal('aout decembre');
    chai.expect(v.latinise('\t\n')).to.be.equal('\t\n');
    chai.expect(v.latinise('⁇')).to.be.equal('⁇');
    chai.expect(v.latinise(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should latinise the first character in a string representation of an object', function () {
    chai.expect(v.latinise(['María'])).to.be.equal('Maria');
    chai.expect(v.latinise({
      toString: function toString() {
        return 'sacó';
      }
    })).to.be.equal('saco');
  });

  it('should not modify numbers', function () {
    chai.expect(v.latinise(100)).to.be.equal('100');
    chai.expect(v.latinise(812)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.latinise()).to.be.equal('');
    chai.expect(v.latinise(undefined)).to.be.equal('');
    chai.expect(v.latinise(null)).to.be.equal('');
  });
});

describe('repeat', function () {

  it('should repeat a string', function () {
    chai.expect(v.repeat('paradise', 2)).to.be.equal('paradiseparadise');
    chai.expect(v.repeat('w', 3)).to.be.equal('www');
    chai.expect(v.repeat('the world is yours', 1)).to.be.equal('the world is yours');
    chai.expect(v.repeat('', 10)).to.be.equal('');
    chai.expect(v.repeat(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should return an empty string for 0 repeat times', function () {
    chai.expect(v.repeat('the world is yours', 0)).to.be.equal('');
    chai.expect(v.repeat('', 0)).to.be.equal('');
  });

  it('should return the same string when the number of times is null or undefined', function () {
    chai.expect(v.repeat('the world is yours')).to.be.equal('the world is yours');
    chai.expect(v.repeat('the world is yours', null)).to.be.equal('the world is yours');
    chai.expect(v.repeat('the world is yours', undefined)).to.be.equal('the world is yours');
  });

  it('should repeat a number', function () {
    chai.expect(v.repeat(123, 2)).to.be.equal('123123');
    chai.expect(v.repeat(0, 5)).to.be.equal('00000');
    chai.expect(v.repeat(-1.5, 2)).to.be.equal('-1.5-1.5');
  });

  it('should repeat a string representation of an object', function () {
    chai.expect(v.repeat(['paradise'], 2)).to.be.equal('paradiseparadise');
    chai.expect(v.repeat({
      toString: function toString() {
        return 'Tony';
      }
    }, 2)).to.be.equal('TonyTony');
  });

  it('should return an empty string for null or undefined string to be repeated', function () {
    chai.expect(v.repeat()).to.be.equal('');
    chai.expect(v.repeat(null)).to.be.equal('');
    chai.expect(v.repeat(undefined)).to.be.equal('');
    chai.expect(v.repeat(undefined, 10)).to.be.equal('');
  });
});

describe('reverse', function () {

  it('should reverse a string', function () {
    chai.expect(v.reverse('green tree')).to.be.equal('eert neerg');
    chai.expect(v.reverse('o')).to.be.equal('o');
    chai.expect(v.reverse('\n\t')).to.be.equal('\t\n');
    chai.expect(v.reverse('')).to.be.equal('');
    chai.expect(v.reverse(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverse a number', function () {
    chai.expect(v.reverse(123)).to.be.equal('321');
    chai.expect(v.reverse(0)).to.be.equal('0');
    chai.expect(v.reverse(-1.5)).to.be.equal('5.1-');
  });

  it('should reverse a string representation of an object', function () {
    chai.expect(v.reverse(['flower'])).to.be.equal('rewolf');
    chai.expect(v.reverse({
      toString: function toString() {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.reverse()).to.be.equal('');
    chai.expect(v.reverse(null)).to.be.equal('');
    chai.expect(v.reverse(undefined)).to.be.equal('');
  });
});

describe('reverseCodePoint', function () {

  it('should reverse a string', function () {
    chai.expect(v.reverseCodePoint('green tree')).to.be.equal('eert neerg');
    chai.expect(v.reverseCodePoint('ma\xF1ana')).to.be.equal('ana\xF1am');
    chai.expect(v.reverseCodePoint('mañana')).to.be.equal('anañam');
    chai.expect(v.reverseCodePoint('foõ͜͝͞bar')).to.be.equal('rabõ͜͝͞of');
    chai.expect(v.reverseCodePoint('foo𝌆̃͜͝͞bar')).to.be.equal('rab𝌆̃͜͝͞oof');
    chai.expect(v.reverseCodePoint('o')).to.be.equal('o');
    chai.expect(v.reverseCodePoint('\n\t')).to.be.equal('\t\n');
    chai.expect(v.reverseCodePoint('')).to.be.equal('');
  });

  it('should reverseCodePoint a number', function () {
    chai.expect(v.reverseCodePoint(123)).to.be.equal('321');
    chai.expect(v.reverseCodePoint(0)).to.be.equal('0');
    chai.expect(v.reverseCodePoint(-1.5)).to.be.equal('5.1-');
  });

  it('should reverseCodePoint a string representation of an object', function () {
    chai.expect(v.reverseCodePoint(['flower'])).to.be.equal('rewolf');
    chai.expect(v.reverseCodePoint({
      toString: function toString() {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.reverseCodePoint()).to.be.equal('');
    chai.expect(v.reverseCodePoint(null)).to.be.equal('');
    chai.expect(v.reverseCodePoint(undefined)).to.be.equal('');
  });
});

describe('slice', function () {

  it('should slice a string', function () {
    chai.expect(v.slice('infinite loop', 9)).to.be.equal('loop');
    chai.expect(v.slice('infinite loop', 0)).to.be.equal('infinite loop');
    chai.expect(v.slice('infinite loop')).to.be.equal('infinite loop');
    chai.expect(v.slice('infinite loop', 1)).to.be.equal('nfinite loop');
  });

  it('should slice a string with an end position', function () {
    chai.expect(v.slice('infinite loop', 9, 12)).to.be.equal('loo');
    chai.expect(v.slice('infinite loop', 9, -1)).to.be.equal('loo');
    chai.expect(v.slice('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    chai.expect(v.slice('infinite loop', 1, 2)).to.be.equal('n');
    chai.expect(v.slice('infinite loop', -4, -1)).to.be.equal('loo');
  });

  it('should slice a string representation of an object', function () {
    chai.expect(v.slice(['infinite loop'], 10)).to.be.equal('oop');
    chai.expect(v.slice({
      toString: function toString() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should slice a string from a number', function () {
    chai.expect(v.slice(12345, 3)).to.be.equal('45');
    chai.expect(v.slice(987, 1, 2)).to.be.equal('8');
  });
});

describe('substr', function () {

  it('should substract a string', function () {
    chai.expect(v.substr('infinite loop', 9)).to.be.equal('loop');
    chai.expect(v.substr('infinite loop', 0)).to.be.equal('infinite loop');
    chai.expect(v.substr('infinite loop')).to.be.equal('infinite loop');
    chai.expect(v.substr('infinite loop', 1)).to.be.equal('nfinite loop');
    chai.expect(v.substr('infinite loop', -4)).to.be.equal('loop');
  });

  it('should substract a string with a length', function () {
    chai.expect(v.substr('infinite loop', 9, 3)).to.be.equal('loo');
    chai.expect(v.substr('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    chai.expect(v.substr('infinite loop', 1, 1)).to.be.equal('n');
    chai.expect(v.substr('infinite loop', -4, 1)).to.be.equal('l');
  });

  it('should substract a string representation of an object', function () {
    chai.expect(v.substr(['infinite loop'], 10)).to.be.equal('oop');
    chai.expect(v.substr({
      toString: function toString() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should substract a string from a number', function () {
    chai.expect(v.substr(12345, 3)).to.be.equal('45');
    chai.expect(v.substr(987, 1, 1)).to.be.equal('8');
  });
});

describe('substring', function () {

  it('should substring a string', function () {
    chai.expect(v.substring('infinite loop', 9)).to.be.equal('loop');
    chai.expect(v.substring('infinite loop', 0)).to.be.equal('infinite loop');
    chai.expect(v.substring('infinite loop')).to.be.equal('infinite loop');
    chai.expect(v.substring('infinite loop', 1)).to.be.equal('nfinite loop');
  });

  it('should substring a string with an end position', function () {
    chai.expect(v.substring('infinite loop', 9, 12)).to.be.equal('loo');
    chai.expect(v.substring('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    chai.expect(v.substring('infinite loop', 1, 2)).to.be.equal('n');
  });

  it('should substring a string representation of an object', function () {
    chai.expect(v.substring(['infinite loop'], 10)).to.be.equal('oop');
    chai.expect(v.substring({
      toString: function toString() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should substring a string from a number', function () {
    chai.expect(v.substring(12345, 3)).to.be.equal('45');
    chai.expect(v.substring(987, 1, 2)).to.be.equal('8');
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