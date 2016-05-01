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
 * @return {number} Returns the number of characters in `subject`.
 * @example
 * v.length('rain');
 * // => 4
 */
function length (subject) {
  return toString(nilDefault(subject, '')).length;
}

/**
 * A regular expression to match lower case letter
 *
 * @type {string}
 * @ignore
 */
var lowercaseLetter = 'a-z\\xB5\\xDF-\\xF6\\xF8-\\xFF\\u0101\\u0103\\u0105\\u0107\\u0109\\u010B\\u010D\\u010F\\u0111\\u0113\\u0115\\u0117\\u0119\\u011B\\u011D\\u011F\\u0121\\u0123\\u0125\\u0127\\u0129\\u012B\\u012D\\u012F\\u0131\\u0133\\u0135\\u0137\\u0138\\u013A\\u013C\\u013E\\u0140\\u0142\\u0144\\u0146\\u0148\\u0149\\u014B\\u014D\\u014F\\u0151\\u0153\\u0155\\u0157\\u0159\\u015B\\u015D\\u015F\\u0161\\u0163\\u0165\\u0167\\u0169\\u016B\\u016D\\u016F\\u0171\\u0173\\u0175\\u0177\\u017A\\u017C\\u017E-\\u0180\\u0183\\u0185\\u0188\\u018C\\u018D\\u0192\\u0195\\u0199-\\u019B\\u019E\\u01A1\\u01A3\\u01A5\\u01A8\\u01AA\\u01AB\\u01AD\\u01B0\\u01B4\\u01B6\\u01B9\\u01BA\\u01BD-\\u01BF\\u01C6\\u01C9\\u01CC\\u01CE\\u01D0\\u01D2\\u01D4\\u01D6\\u01D8\\u01DA\\u01DC\\u01DD\\u01DF\\u01E1\\u01E3\\u01E5\\u01E7\\u01E9\\u01EB\\u01ED\\u01EF\\u01F0\\u01F3\\u01F5\\u01F9\\u01FB\\u01FD\\u01FF\\u0201\\u0203\\u0205\\u0207\\u0209\\u020B\\u020D\\u020F\\u0211\\u0213\\u0215\\u0217\\u0219\\u021B\\u021D\\u021F\\u0221\\u0223\\u0225\\u0227\\u0229\\u022B\\u022D\\u022F\\u0231\\u0233-\\u0239\\u023C\\u023F\\u0240\\u0242\\u0247\\u0249\\u024B\\u024D\\u024F-\\u0293\\u0295-\\u02AF\\u0371\\u0373\\u0377\\u037B-\\u037D\\u0390\\u03AC-\\u03CE\\u03D0\\u03D1\\u03D5-\\u03D7\\u03D9\\u03DB\\u03DD\\u03DF\\u03E1\\u03E3\\u03E5\\u03E7\\u03E9\\u03EB\\u03ED\\u03EF-\\u03F3\\u03F5\\u03F8\\u03FB\\u03FC\\u0430-\\u045F\\u0461\\u0463\\u0465\\u0467\\u0469\\u046B\\u046D\\u046F\\u0471\\u0473\\u0475\\u0477\\u0479\\u047B\\u047D\\u047F\\u0481\\u048B\\u048D\\u048F\\u0491\\u0493\\u0495\\u0497\\u0499\\u049B\\u049D\\u049F\\u04A1\\u04A3\\u04A5\\u04A7\\u04A9\\u04AB\\u04AD\\u04AF\\u04B1\\u04B3\\u04B5\\u04B7\\u04B9\\u04BB\\u04BD\\u04BF\\u04C2\\u04C4\\u04C6\\u04C8\\u04CA\\u04CC\\u04CE\\u04CF\\u04D1\\u04D3\\u04D5\\u04D7\\u04D9\\u04DB\\u04DD\\u04DF\\u04E1\\u04E3\\u04E5\\u04E7\\u04E9\\u04EB\\u04ED\\u04EF\\u04F1\\u04F3\\u04F5\\u04F7\\u04F9\\u04FB\\u04FD\\u04FF\\u0501\\u0503\\u0505\\u0507\\u0509\\u050B\\u050D\\u050F\\u0511\\u0513\\u0515\\u0517\\u0519\\u051B\\u051D\\u051F\\u0521\\u0523\\u0525\\u0527\\u0529\\u052B\\u052D\\u052F\\u0561-\\u0587\\u13F8-\\u13FD\\u1D00-\\u1D2B\\u1D6B-\\u1D77\\u1D79-\\u1D9A\\u1E01\\u1E03\\u1E05\\u1E07\\u1E09\\u1E0B\\u1E0D\\u1E0F\\u1E11\\u1E13\\u1E15\\u1E17\\u1E19\\u1E1B\\u1E1D\\u1E1F\\u1E21\\u1E23\\u1E25\\u1E27\\u1E29\\u1E2B\\u1E2D\\u1E2F\\u1E31\\u1E33\\u1E35\\u1E37\\u1E39\\u1E3B\\u1E3D\\u1E3F\\u1E41\\u1E43\\u1E45\\u1E47\\u1E49\\u1E4B\\u1E4D\\u1E4F\\u1E51\\u1E53\\u1E55\\u1E57\\u1E59\\u1E5B\\u1E5D\\u1E5F\\u1E61\\u1E63\\u1E65\\u1E67\\u1E69\\u1E6B\\u1E6D\\u1E6F\\u1E71\\u1E73\\u1E75\\u1E77\\u1E79\\u1E7B\\u1E7D\\u1E7F\\u1E81\\u1E83\\u1E85\\u1E87\\u1E89\\u1E8B\\u1E8D\\u1E8F\\u1E91\\u1E93\\u1E95-\\u1E9D\\u1E9F\\u1EA1\\u1EA3\\u1EA5\\u1EA7\\u1EA9\\u1EAB\\u1EAD\\u1EAF\\u1EB1\\u1EB3\\u1EB5\\u1EB7\\u1EB9\\u1EBB\\u1EBD\\u1EBF\\u1EC1\\u1EC3\\u1EC5\\u1EC7\\u1EC9\\u1ECB\\u1ECD\\u1ECF\\u1ED1\\u1ED3\\u1ED5\\u1ED7\\u1ED9\\u1EDB\\u1EDD\\u1EDF\\u1EE1\\u1EE3\\u1EE5\\u1EE7\\u1EE9\\u1EEB\\u1EED\\u1EEF\\u1EF1\\u1EF3\\u1EF5\\u1EF7\\u1EF9\\u1EFB\\u1EFD\\u1EFF-\\u1F07\\u1F10-\\u1F15\\u1F20-\\u1F27\\u1F30-\\u1F37\\u1F40-\\u1F45\\u1F50-\\u1F57\\u1F60-\\u1F67\\u1F70-\\u1F7D\\u1F80-\\u1F87\\u1F90-\\u1F97\\u1FA0-\\u1FA7\\u1FB0-\\u1FB4\\u1FB6\\u1FB7\\u1FBE\\u1FC2-\\u1FC4\\u1FC6\\u1FC7\\u1FD0-\\u1FD3\\u1FD6\\u1FD7\\u1FE0-\\u1FE7\\u1FF2-\\u1FF4\\u1FF6\\u1FF7\\u210A\\u210E\\u210F\\u2113\\u212F\\u2134\\u2139\\u213C\\u213D\\u2146-\\u2149\\u214E\\u2184\\u2C30-\\u2C5E\\u2C61\\u2C65\\u2C66\\u2C68\\u2C6A\\u2C6C\\u2C71\\u2C73\\u2C74\\u2C76-\\u2C7B\\u2C81\\u2C83\\u2C85\\u2C87\\u2C89\\u2C8B\\u2C8D\\u2C8F\\u2C91\\u2C93\\u2C95\\u2C97\\u2C99\\u2C9B\\u2C9D\\u2C9F\\u2CA1\\u2CA3\\u2CA5\\u2CA7\\u2CA9\\u2CAB\\u2CAD\\u2CAF\\u2CB1\\u2CB3\\u2CB5\\u2CB7\\u2CB9\\u2CBB\\u2CBD\\u2CBF\\u2CC1\\u2CC3\\u2CC5\\u2CC7\\u2CC9\\u2CCB\\u2CCD\\u2CCF\\u2CD1\\u2CD3\\u2CD5\\u2CD7\\u2CD9\\u2CDB\\u2CDD\\u2CDF\\u2CE1\\u2CE3\\u2CE4\\u2CEC\\u2CEE\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\uA641\\uA643\\uA645\\uA647\\uA649\\uA64B\\uA64D\\uA64F\\uA651\\uA653\\uA655\\uA657\\uA659\\uA65B\\uA65D\\uA65F\\uA661\\uA663\\uA665\\uA667\\uA669\\uA66B\\uA66D\\uA681\\uA683\\uA685\\uA687\\uA689\\uA68B\\uA68D\\uA68F\\uA691\\uA693\\uA695\\uA697\\uA699\\uA69B\\uA723\\uA725\\uA727\\uA729\\uA72B\\uA72D\\uA72F-\\uA731\\uA733\\uA735\\uA737\\uA739\\uA73B\\uA73D\\uA73F\\uA741\\uA743\\uA745\\uA747\\uA749\\uA74B\\uA74D\\uA74F\\uA751\\uA753\\uA755\\uA757\\uA759\\uA75B\\uA75D\\uA75F\\uA761\\uA763\\uA765\\uA767\\uA769\\uA76B\\uA76D\\uA76F\\uA771-\\uA778\\uA77A\\uA77C\\uA77F\\uA781\\uA783\\uA785\\uA787\\uA78C\\uA78E\\uA791\\uA793-\\uA795\\uA797\\uA799\\uA79B\\uA79D\\uA79F\\uA7A1\\uA7A3\\uA7A5\\uA7A7\\uA7A9\\uA7B5\\uA7B7\\uA7FA\\uAB30-\\uAB5A\\uAB60-\\uAB65\\uAB70-\\uABBF\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFF41-\\uFF5A';

/**
 * A regular expression to match modifier letter
 *
 * @type {string}
 * @ignore
 */
var modifierLetter = '\\u02B0-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0374\\u037A\\u0559\\u0640\\u06E5\\u06E6\\u07F4\\u07F5\\u07FA\\u081A\\u0824\\u0828\\u0971\\u0E46\\u0EC6\\u10FC\\u17D7\\u1843\\u1AA7\\u1C78-\\u1C7D\\u1D2C-\\u1D6A\\u1D78\\u1D9B-\\u1DBF\\u2071\\u207F\\u2090-\\u209C\\u2C7C\\u2C7D\\u2D6F\\u2E2F\\u3005\\u3031-\\u3035\\u303B\\u309D\\u309E\\u30FC-\\u30FE\\uA015\\uA4F8-\\uA4FD\\uA60C\\uA67F\\uA69C\\uA69D\\uA717-\\uA71F\\uA770\\uA788\\uA7F8\\uA7F9\\uA9CF\\uA9E6\\uAA70\\uAADD\\uAAF3\\uAAF4\\uAB5C-\\uAB5F\\uFF70\\uFF9E\\uFF9F';

/**
 * A regular expression to match other letter
 *
 * @type {string}
 * @ignore
 */
var otherLetter = '\\xAA\\xBA\\u01BB\\u01C0-\\u01C3\\u0294\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u063F\\u0641-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u0800-\\u0815\\u0840-\\u0858\\u08A0-\\u08B4\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0972-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E45\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10D0-\\u10FA\\u10FD-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16F1-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17DC\\u1820-\\u1842\\u1844-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C77\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u2135-\\u2138\\u2D30-\\u2D67\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u3006\\u303C\\u3041-\\u3096\\u309F\\u30A1-\\u30FA\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA014\\uA016-\\uA48C\\uA4D0-\\uA4F7\\uA500-\\uA60B\\uA610-\\uA61F\\uA62A\\uA62B\\uA66E\\uA6A0-\\uA6E5\\uA78F\\uA7F7\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9E0-\\uA9E4\\uA9E7-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA6F\\uAA71-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB\\uAADC\\uAAE0-\\uAAEA\\uAAF2\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF66-\\uFF6F\\uFF71-\\uFF9D\\uFFA0-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC';

/**
 * A regular expression to match title case letter
 *
 * @type {string}
 * @ignore
 */
var titlecaseLetter = '\\u01C5\\u01C8\\u01CB\\u01F2\\u1F88-\\u1F8F\\u1F98-\\u1F9F\\u1FA8-\\u1FAF\\u1FBC\\u1FCC\\u1FFC';

/**
 * A regular expression to match upper case letter
 *
 * @type {string}
 * @ignore
 */
var uppercaseLetter = 'A-Z\\xC0-\\xD6\\xD8-\\xDE\\u0100\\u0102\\u0104\\u0106\\u0108\\u010A\\u010C\\u010E\\u0110\\u0112\\u0114\\u0116\\u0118\\u011A\\u011C\\u011E\\u0120\\u0122\\u0124\\u0126\\u0128\\u012A\\u012C\\u012E\\u0130\\u0132\\u0134\\u0136\\u0139\\u013B\\u013D\\u013F\\u0141\\u0143\\u0145\\u0147\\u014A\\u014C\\u014E\\u0150\\u0152\\u0154\\u0156\\u0158\\u015A\\u015C\\u015E\\u0160\\u0162\\u0164\\u0166\\u0168\\u016A\\u016C\\u016E\\u0170\\u0172\\u0174\\u0176\\u0178\\u0179\\u017B\\u017D\\u0181\\u0182\\u0184\\u0186\\u0187\\u0189-\\u018B\\u018E-\\u0191\\u0193\\u0194\\u0196-\\u0198\\u019C\\u019D\\u019F\\u01A0\\u01A2\\u01A4\\u01A6\\u01A7\\u01A9\\u01AC\\u01AE\\u01AF\\u01B1-\\u01B3\\u01B5\\u01B7\\u01B8\\u01BC\\u01C4\\u01C7\\u01CA\\u01CD\\u01CF\\u01D1\\u01D3\\u01D5\\u01D7\\u01D9\\u01DB\\u01DE\\u01E0\\u01E2\\u01E4\\u01E6\\u01E8\\u01EA\\u01EC\\u01EE\\u01F1\\u01F4\\u01F6-\\u01F8\\u01FA\\u01FC\\u01FE\\u0200\\u0202\\u0204\\u0206\\u0208\\u020A\\u020C\\u020E\\u0210\\u0212\\u0214\\u0216\\u0218\\u021A\\u021C\\u021E\\u0220\\u0222\\u0224\\u0226\\u0228\\u022A\\u022C\\u022E\\u0230\\u0232\\u023A\\u023B\\u023D\\u023E\\u0241\\u0243-\\u0246\\u0248\\u024A\\u024C\\u024E\\u0370\\u0372\\u0376\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E\\u038F\\u0391-\\u03A1\\u03A3-\\u03AB\\u03CF\\u03D2-\\u03D4\\u03D8\\u03DA\\u03DC\\u03DE\\u03E0\\u03E2\\u03E4\\u03E6\\u03E8\\u03EA\\u03EC\\u03EE\\u03F4\\u03F7\\u03F9\\u03FA\\u03FD-\\u042F\\u0460\\u0462\\u0464\\u0466\\u0468\\u046A\\u046C\\u046E\\u0470\\u0472\\u0474\\u0476\\u0478\\u047A\\u047C\\u047E\\u0480\\u048A\\u048C\\u048E\\u0490\\u0492\\u0494\\u0496\\u0498\\u049A\\u049C\\u049E\\u04A0\\u04A2\\u04A4\\u04A6\\u04A8\\u04AA\\u04AC\\u04AE\\u04B0\\u04B2\\u04B4\\u04B6\\u04B8\\u04BA\\u04BC\\u04BE\\u04C0\\u04C1\\u04C3\\u04C5\\u04C7\\u04C9\\u04CB\\u04CD\\u04D0\\u04D2\\u04D4\\u04D6\\u04D8\\u04DA\\u04DC\\u04DE\\u04E0\\u04E2\\u04E4\\u04E6\\u04E8\\u04EA\\u04EC\\u04EE\\u04F0\\u04F2\\u04F4\\u04F6\\u04F8\\u04FA\\u04FC\\u04FE\\u0500\\u0502\\u0504\\u0506\\u0508\\u050A\\u050C\\u050E\\u0510\\u0512\\u0514\\u0516\\u0518\\u051A\\u051C\\u051E\\u0520\\u0522\\u0524\\u0526\\u0528\\u052A\\u052C\\u052E\\u0531-\\u0556\\u10A0-\\u10C5\\u10C7\\u10CD\\u13A0-\\u13F5\\u1E00\\u1E02\\u1E04\\u1E06\\u1E08\\u1E0A\\u1E0C\\u1E0E\\u1E10\\u1E12\\u1E14\\u1E16\\u1E18\\u1E1A\\u1E1C\\u1E1E\\u1E20\\u1E22\\u1E24\\u1E26\\u1E28\\u1E2A\\u1E2C\\u1E2E\\u1E30\\u1E32\\u1E34\\u1E36\\u1E38\\u1E3A\\u1E3C\\u1E3E\\u1E40\\u1E42\\u1E44\\u1E46\\u1E48\\u1E4A\\u1E4C\\u1E4E\\u1E50\\u1E52\\u1E54\\u1E56\\u1E58\\u1E5A\\u1E5C\\u1E5E\\u1E60\\u1E62\\u1E64\\u1E66\\u1E68\\u1E6A\\u1E6C\\u1E6E\\u1E70\\u1E72\\u1E74\\u1E76\\u1E78\\u1E7A\\u1E7C\\u1E7E\\u1E80\\u1E82\\u1E84\\u1E86\\u1E88\\u1E8A\\u1E8C\\u1E8E\\u1E90\\u1E92\\u1E94\\u1E9E\\u1EA0\\u1EA2\\u1EA4\\u1EA6\\u1EA8\\u1EAA\\u1EAC\\u1EAE\\u1EB0\\u1EB2\\u1EB4\\u1EB6\\u1EB8\\u1EBA\\u1EBC\\u1EBE\\u1EC0\\u1EC2\\u1EC4\\u1EC6\\u1EC8\\u1ECA\\u1ECC\\u1ECE\\u1ED0\\u1ED2\\u1ED4\\u1ED6\\u1ED8\\u1EDA\\u1EDC\\u1EDE\\u1EE0\\u1EE2\\u1EE4\\u1EE6\\u1EE8\\u1EEA\\u1EEC\\u1EEE\\u1EF0\\u1EF2\\u1EF4\\u1EF6\\u1EF8\\u1EFA\\u1EFC\\u1EFE\\u1F08-\\u1F0F\\u1F18-\\u1F1D\\u1F28-\\u1F2F\\u1F38-\\u1F3F\\u1F48-\\u1F4D\\u1F59\\u1F5B\\u1F5D\\u1F5F\\u1F68-\\u1F6F\\u1FB8-\\u1FBB\\u1FC8-\\u1FCB\\u1FD8-\\u1FDB\\u1FE8-\\u1FEC\\u1FF8-\\u1FFB\\u2102\\u2107\\u210B-\\u210D\\u2110-\\u2112\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u2130-\\u2133\\u213E\\u213F\\u2145\\u2183\\u2C00-\\u2C2E\\u2C60\\u2C62-\\u2C64\\u2C67\\u2C69\\u2C6B\\u2C6D-\\u2C70\\u2C72\\u2C75\\u2C7E-\\u2C80\\u2C82\\u2C84\\u2C86\\u2C88\\u2C8A\\u2C8C\\u2C8E\\u2C90\\u2C92\\u2C94\\u2C96\\u2C98\\u2C9A\\u2C9C\\u2C9E\\u2CA0\\u2CA2\\u2CA4\\u2CA6\\u2CA8\\u2CAA\\u2CAC\\u2CAE\\u2CB0\\u2CB2\\u2CB4\\u2CB6\\u2CB8\\u2CBA\\u2CBC\\u2CBE\\u2CC0\\u2CC2\\u2CC4\\u2CC6\\u2CC8\\u2CCA\\u2CCC\\u2CCE\\u2CD0\\u2CD2\\u2CD4\\u2CD6\\u2CD8\\u2CDA\\u2CDC\\u2CDE\\u2CE0\\u2CE2\\u2CEB\\u2CED\\u2CF2\\uA640\\uA642\\uA644\\uA646\\uA648\\uA64A\\uA64C\\uA64E\\uA650\\uA652\\uA654\\uA656\\uA658\\uA65A\\uA65C\\uA65E\\uA660\\uA662\\uA664\\uA666\\uA668\\uA66A\\uA66C\\uA680\\uA682\\uA684\\uA686\\uA688\\uA68A\\uA68C\\uA68E\\uA690\\uA692\\uA694\\uA696\\uA698\\uA69A\\uA722\\uA724\\uA726\\uA728\\uA72A\\uA72C\\uA72E\\uA732\\uA734\\uA736\\uA738\\uA73A\\uA73C\\uA73E\\uA740\\uA742\\uA744\\uA746\\uA748\\uA74A\\uA74C\\uA74E\\uA750\\uA752\\uA754\\uA756\\uA758\\uA75A\\uA75C\\uA75E\\uA760\\uA762\\uA764\\uA766\\uA768\\uA76A\\uA76C\\uA76E\\uA779\\uA77B\\uA77D\\uA77E\\uA780\\uA782\\uA784\\uA786\\uA78B\\uA78D\\uA790\\uA792\\uA796\\uA798\\uA79A\\uA79C\\uA79E\\uA7A0\\uA7A2\\uA7A4\\uA7A6\\uA7A8\\uA7AA-\\uA7AD\\uA7B0-\\uA7B4\\uA7B6\\uFF21-\\uFF3A';

/**
 * A regular expression that matches non upper or title case letter
 *
 * @type {string}
 * @ignore
 */
var lowLetter = lowercaseLetter + modifierLetter + otherLetter;

/**
 * A regular expression that matches upper letter (upper case + title case)
 *
 * @type {string}
 * @ignore
 */
var upLetter = titlecaseLetter + uppercaseLetter;

/**
 * A regular expression to match letter category
 *
 * @type {string}
 * @ignore
 */
var letter = lowLetter + upLetter;

/**
 * A regular expression matching digits
 *
 * @type {string}
 * @ignore
 */
var digit = '\\d';

/**
 * A regular expression matching whitespace
 *
 * @type {string}
 * @ignore
 */
var whitespace = '\\s\\uFEFF\\xA0';

/**
 * A regular expression matching high surrogate
 *
 * @type {string}
 * @ignore
 */
var highSurrogate = '\\uD800-\\uDBFF';

/**
 * A regular expression matching low surrogate
 *
 * @type {string}
 * @ignore
 */
var lowSurrogate = '\\uDC00-\\uDFFF';

/**
 * A regular expression matching diacritical mark
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
var REGEXP_ALPHA = new RegExp('^(?:[' + letter + '][' + diacriticalMark + ']*)+$');

/**
 * Regular expression to match alpha and digit characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA_DIGIT = new RegExp('^((?:[' + letter + '][' + diacriticalMark + ']*)|[' + digit + '])+$');

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
var REGEXP_NOT_BASIC_LATIN = /[^\u0000-\u007E]/g;

/**
 * Regular expression to match regular expression special characters
 * @type {RegExp}
 * @ignore
 */
var REGEXP_SPECIAL_CHARACTERS = /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g;

/**
 * Regular expression to match words
 * @type {RegExp}
 * @ignore
 */
var REGEXP_WORD = new RegExp('((?:[' + upLetter + '][' + diacriticalMark + ']*)?(?:[' + lowLetter + '][' + diacriticalMark + ']*)+)|\
((?:[' + upLetter + '][' + diacriticalMark + ']*)+(?![' + lowLetter + ']))|\
([' + digit + ']+)', 'g');

/**
 * Counts the characters in `subject` taking care of
 * <a href="http://www.unicode.org/faq/utf_bom.html#utf16-2">surrogate pairs</a> and
 * <a href="http://unicode.org/faq/char_combmark.html">combining marks</a>.
 *
 * @function lengthCodePoint
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @return {number} Returns the number of characters in `subject`.
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
 * @return {number} Returns the number of characters.
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
 * Escapes the regular expression special characters `- [ ] / { } ( ) * + ? . \ ^ $ |` in `subject`.
 *
 * @function escapeRegExp
 * @static
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * v.escapeRegExp('(hours)[minutes]{seconds}');
 * // => '\(hours\)\[minutes\]\{seconds\}'
 */
function escapeRegExp (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.replace(REGEXP_SPECIAL_CHARACTERS, '\\$&');
}

/**
 * Returns the first occurrence index of `search` in `subject`.
 *
 * @function indexOf
 * @static
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
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.indexOf(search, fromIndex);
}

/**
 * Returns the last occurrence index of `search` in `subject`.
 *
 * @function lastIndexOf
 * @static
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
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.lastIndexOf(search, fromIndex);
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
 * Returns the first match index of `pattern` in `subject`.
 *
 * @function search
 * @static
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
  var subjectString = toString(nilDefault(subject, '')),
      fromIndexNumber = isNil(fromIndex) ? 0 : clipNumber(toInteger(fromIndex), 0, subjectString.length);
  var matchIndex = subjectString.substr(fromIndexNumber).search(pattern);
  if (matchIndex !== -1 && !isNaN(fromIndexNumber)) {
    matchIndex += fromIndexNumber;
  }
  return matchIndex;
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
 * v.capitalize('apple');
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
 * Returns a new string where the matches of `pattern` are replaced with `replacement`.
 *
 * @function replace
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} pattern The pattern which match is replaced with `replacement`. If `pattern` is string, a simple string match is evaluated.
 * @param {string|Function} replacement The string or a function which invocation result replaces `pattern` match.
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
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.replace(pattern, replacement);
}

/**
 * Reverses the `subject`.
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
 * Reverses the `subject` taking care of
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
 * Extracts from `subject` a string from `start` position to `end` position.
 *
 * @function slice
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {number} start The position to start extraction. If negative use `subject.length + start`.
 * @param {number} [end=subject.length] The position to end extraction. If negative use `subject.length + end`.
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
 * @param {number} start The position to start extraction.
 * @param {number} [length=subject.endOfString] The number of characters to extract. If omitted, extract to the end of `subject`.
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
 * Extracts from `subject` a string from `start` position to `end` position.
 *
 * @function substring
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {number} start The position to start extraction.
 * @param {number} [end=subject.length] The position to end extraction.
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
 * Converts the `subject` to lower case.
 *
 * @function toLowerCase
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to convert to lower case.
 * @return {string} The lower case string.
 * @example
 * v.toLowerCase('Green');
 * // => 'green'
 */
function toLowerCase (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.toLowerCase();
}

/**
 * Converts the `subject` to upper case.
 *
 * @function toUpperCase
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to convert to upper case.
 * @return {string} The upper case string.
 * @example
 * v.toUpperCase('school');
 * // => 'SCHOOL'
 */
function toUpperCase (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.toUpperCase();
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
 * v.trimLeft('***Mobile Infantry', '*');
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

/**
 * Checks if `subject` ends with `end`.
 *
 * @function endsWith
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} end The ending string.
 * @param {number} [position=subject.length] Search within `subject` as if this string were only `position` long.
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
  var subjectString = toString(nilDefault(subject, '')),
      flagsString = toString(nilDefault(flags, '')),
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
 * Splits `subject` into an array of characters.
 *
 * @function chars
 * @static
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of characters.
 * @example
 * v.chars('cloud');
 * // => ['c', 'l', 'o', 'u', 'd']
 */
function chars (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.split('');
}

/**
 * Splits `subject` into an array of characters taking care of
 * <a href="http://www.unicode.org/faq/utf_bom.html#utf16-2">surrogate pairs</a> and
 * <a href="http://unicode.org/faq/char_combmark.html">combining marks</a>.
 *
 * @function charsCodePoint
 * @static
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of characters.
 * @example
 * v.charsCodePoint('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => ['\uD835\uDC00', '\uD835\uDC01']
 *
 * v.charsCodePoint('cafe\u0301'); // or 'café'
 * // => ['c', 'a', 'f', 'e\u0301']
 */
function charsCodePoint (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return nilDefault(subjectString.match(REGEXP_UNICODE_CHARACTER), []);
}

/**
 * Splits `subject` into an array of chunks by `separator`.
 *
 * @function split
 * @static
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
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.split(separator, limit);
}

/**
 * Splits `subject` into an array of words.
 *
 * @function words
 * @static
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
  var subjectString = toString(nilDefault(subject, '')),
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

var v = {
  length: length,
  lengthCodePoint: lengthCodePoint,
  lengthWhere: lengthWhere,

  escapeRegExp: escapeRegExp,

  indexOf: indexOf,
  lastIndexOf: lastIndexOf,
  search: search,

  decapitalize: decapitalize,
  capitalize: capitalize,
  latinise: latinise,
  repeat: repeat,
  replace: replace,
  reverseCodePoint: reverseCodePoint,
  reverse: reverse,
  slice: slice,
  substr: substr,
  substring: substring,
  toLowerCase: toLowerCase,
  toUpperCase: toUpperCase,
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
  charsCodePoint: charsCodePoint,
  split: split,
  words: words
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
var REVERSED_PRINTABLE_ASCII = '~}|{zyxwvutsrqponmlkjihgfedcba`_^]\\[ZYXWVUTSRQPONMLKJIHGFEDCBA@?>=<;:9876543210/.-,+*)(\'&%$#"! ';

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

describe('escapeRegExp', function () {

  it('should return the escaped string', function () {
    chai.expect(v.escapeRegExp('-[]/{}()*+?.\\^$|')).to.be.equal('\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|');
    chai.expect(v.escapeRegExp('time')).to.be.equal('time');
    chai.expect(v.escapeRegExp('500-200')).to.be.equal('500\\-200');
    chai.expect(v.escapeRegExp('')).to.be.equal('');
    chai.expect(new RegExp(v.escapeRegExp('[a-z0-9]?')).test('[a-z0-9]?')).to.be.true;
    chai.expect(new RegExp(v.escapeRegExp('.*')).test('future')).to.be.false;
  });

  it('should return the escaped string representation of an object', function () {
    chai.expect(v.escapeRegExp(['-[]object'])).to.be.equal('\\-\\[\\]object');
    chai.expect(v.escapeRegExp({
      toString: function toString() {
        return '1.15';
      }
    })).to.be.equal('1\\.15');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.escapeRegExp()).to.be.equal('');
    chai.expect(v.escapeRegExp(undefined)).to.be.equal('');
    chai.expect(v.escapeRegExp(null)).to.be.equal('');
  });
});

describe('indexOf', function () {

  it('should return the index of a searched string', function () {
    chai.expect(v.indexOf('we have a mission', 'mission')).to.be.equal(10);
    chai.expect(v.indexOf('we have a mission', 'a')).to.be.equal(4);
    chai.expect(v.indexOf('we have a mission', 'we')).to.be.equal(0);
    chai.expect(v.indexOf('we have a mission', '')).to.be.equal(0);
    chai.expect(v.indexOf('', '')).to.be.equal(0);
    chai.expect(v.indexOf(undefined, '')).to.be.equal(0);
    chai.expect(v.indexOf(null, '')).to.be.equal(0);
    chai.expect(v.indexOf(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a searched string and start index', function () {
    chai.expect(v.indexOf('we have a mission', 'a', 6)).to.be.equal(8);
    chai.expect(v.indexOf('we have a mission', 'we', 0)).to.be.equal(0);
    chai.expect(v.indexOf('we have a mission', 'we', NaN)).to.be.equal(0);
    chai.expect(v.indexOf('we have a mission', '', 0)).to.be.equal(0);
    chai.expect(v.indexOf(PRINTABLE_ASCII, '#', 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function () {
    chai.expect(v.indexOf(['we have a mission'], 'a')).to.be.equal(4);
    chai.expect(v.indexOf({
      toString: function toString() {
        return 'we have a mission';
      }
    }, 'we')).to.be.equal(0);
  });

  it('should return -1 for an invalid ending string and position', function () {
    chai.expect(v.indexOf('we have a mission', 'me')).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', '12')).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', 'we', 3)).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', 'mission', 100)).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', 'mission', Infinity)).to.be.equal(-1);
    chai.expect(v.indexOf('', 'me')).to.be.equal(-1);
  });

  it('should return -1 for undefined and null parameters', function () {
    chai.expect(v.indexOf('we have a mission')).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', undefined)).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', null)).to.be.equal(-1);
  });
});

describe('lastIndexOf', function () {

  it('should return the index of a searched string', function () {
    chai.expect(v.lastIndexOf('we have a mission', 'mission')).to.be.equal(10);
    chai.expect(v.lastIndexOf('we have a mission', 'a')).to.be.equal(8);
    chai.expect(v.lastIndexOf('we have a mission', 'we')).to.be.equal(0);
    chai.expect(v.lastIndexOf('we have a mission', '')).to.be.equal(17);
    chai.expect(v.lastIndexOf('', '')).to.be.equal(0);
    chai.expect(v.lastIndexOf(undefined, '')).to.be.equal(0);
    chai.expect(v.lastIndexOf(null, '')).to.be.equal(0);
    chai.expect(v.lastIndexOf(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a searched string and start index', function () {
    chai.expect(v.lastIndexOf('we have a mission', 'a', 17)).to.be.equal(8);
    chai.expect(v.lastIndexOf('we have a mission', 'a', 6)).to.be.equal(4);
    chai.expect(v.lastIndexOf('we have a mission', 'we', 15)).to.be.equal(0);
    chai.expect(v.lastIndexOf('we have a mission', 'we', 17)).to.be.equal(0);
    chai.expect(v.lastIndexOf('we have a mission', '', 1)).to.be.equal(1);
    chai.expect(v.lastIndexOf(PRINTABLE_ASCII, '#', PRINTABLE_ASCII.length - 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function () {
    chai.expect(v.lastIndexOf(['we have a mission'], 'a')).to.be.equal(8);
    chai.expect(v.lastIndexOf({
      toString: function toString() {
        return 'we have a mission';
      }
    }, 'we')).to.be.equal(0);
  });

  it('should return -1 for an invalid ending string and position', function () {
    chai.expect(v.lastIndexOf('we have a mission', 'me')).to.be.equal(-1);
    chai.expect(v.lastIndexOf('we have a mission', '12')).to.be.equal(-1);
    chai.expect(v.lastIndexOf('we have a mission', 'mission', -100)).to.be.equal(-1);
    chai.expect(v.lastIndexOf('we have a mission', 'mission', -Infinity)).to.be.equal(-1);
    chai.expect(v.lastIndexOf('', 'me')).to.be.equal(-1);
  });

  it('should return -1 for undefined and null parameters', function () {
    chai.expect(v.lastIndexOf('we have a mission')).to.be.equal(-1);
    chai.expect(v.lastIndexOf('we have a mission', undefined)).to.be.equal(-1);
    chai.expect(v.lastIndexOf('we have a mission', null)).to.be.equal(-1);
  });
});

describe('search', function () {

  it('should return the index of a match', function () {
    chai.expect(v.search('we have a mission', /mission/)).to.be.equal(10);
    chai.expect(v.search('we have a mission', 'a')).to.be.equal(4);
    chai.expect(v.search('we have a mission', /we/)).to.be.equal(0);
    chai.expect(v.search('we have a mission', /\s/)).to.be.equal(2);
    chai.expect(v.search('we have a mission', '')).to.be.equal(0);
    chai.expect(v.search('', '')).to.be.equal(0);
    chai.expect(v.search(undefined, '')).to.be.equal(0);
    chai.expect(v.search(null, '')).to.be.equal(0);
    chai.expect(v.search(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a match and start index', function () {
    chai.expect(v.search('we have a mission', /a/, 6)).to.be.equal(8);
    chai.expect(v.search('we have a mission', /we/, 0)).to.be.equal(0);
    chai.expect(v.search('we have a mission', 'we', NaN)).to.be.equal(0);
    chai.expect(v.search('we have a mission', '', 0)).to.be.equal(0);
    chai.expect(v.search(PRINTABLE_ASCII, '#', 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function () {
    chai.expect(v.search(['we have a mission'], /a/)).to.be.equal(4);
    chai.expect(v.search({
      toString: function toString() {
        return 'we have a mission';
      }
    }, /we/)).to.be.equal(0);
  });

  it('should threat a null value as "null" match pattern', function () {
    chai.expect(v.search('we have a null mission', null)).to.be.equal(10);
    chai.expect(v.search('we have a mission', null)).to.be.equal(-1);
  });

  it('should return -1 for an invalid ending string and position', function () {
    chai.expect(v.search('we have a mission', /me/)).to.be.equal(-1);
    chai.expect(v.search('we have a mission', /12/)).to.be.equal(-1);
    chai.expect(v.search('we have a mission', /\s^/)).to.be.equal(-1);
    chai.expect(v.search('we have a mission', 'we', 3)).to.be.equal(-1);
    chai.expect(v.search('we have a mission', /mission/, 100)).to.be.equal(-1);
    chai.expect(v.search('we have a mission', /mission/, Infinity)).to.be.equal(-1);
    chai.expect(v.search('', /me/)).to.be.equal(-1);
  });

  it('should return 0 for an undefined', function () {
    chai.expect(v.search('we have a mission')).to.be.equal(0);
    chai.expect(v.search('we have a mission', undefined)).to.be.equal(0);
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

  it('should latinise a string', function () {
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

  it('should latinise a string representation of an object', function () {
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
    chai.expect(v.repeat(PRINTABLE_ASCII, 2)).to.be.equal(PRINTABLE_ASCII + PRINTABLE_ASCII);
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

describe('replace', function () {

  it('should return the replace result with a string pattern', function () {
    chai.expect(v.replace('duck', 'duck', 'swan')).to.be.equal('swan');
    chai.expect(v.replace('duck', 'duck', '')).to.be.equal('');
    chai.expect(v.replace('duck', 'd', '')).to.be.equal('uck');
    chai.expect(v.replace('duck', 'u', function () {
      return 'a';
    })).to.be.equal('dack');
    chai.expect(v.replace('', '', '')).to.be.equal('');
    chai.expect(v.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(v.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).to.be.equal('duck');
  });

  it('should return the replace result with a RegExp pattern', function () {
    chai.expect(v.replace('duck', /duck/, 'swan')).to.be.equal('swan');
    chai.expect(v.replace('duck', /duck/, '')).to.be.equal('');
    chai.expect(v.replace('duck', /d/, '')).to.be.equal('uck');
    chai.expect(v.replace('duck', /u/, function () {
      return 'a';
    })).to.be.equal('dack');
    chai.expect(v.replace('hello world', /(hello)\s(world)/, function (match, hello, world) {
      return world + ', ' + hello;
    })).to.be.equal('world, hello');
  });

  it('should return the replace result from a string representation of an object', function () {
    chai.expect(v.replace(['duck'], 'duck', 'swan')).to.be.equal('swan');
    chai.expect(v.replace({
      toString: function toString() {
        return 'mandarin duck';
      }
    }, /mandarin\s/, '')).to.be.equal('duck');
  });

  it('should return the replace result from a number', function () {
    chai.expect(v.replace(1500, '0', '1')).to.be.equal('1510');
    chai.expect(v.replace(6475, /\d/g, '*')).to.be.equal('****');
  });

  it('should return the an empty string for an undefined or null', function () {
    chai.expect(v.replace(undefined, /./, '1')).to.be.equal('');
    chai.expect(v.replace(null, /./, '1')).to.be.equal('');
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
    chai.expect(v.reverseCodePoint(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
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
    chai.expect(v.slice(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
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
    chai.expect(v.substr(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
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
    chai.expect(v.substring(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
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

describe('toLowerCase', function () {

  it('should return the lower case of a string', function () {
    chai.expect(v.toLowerCase('Saturn')).to.be.equal('saturn');
    chai.expect(v.toLowerCase('EARTH')).to.be.equal('earth');
    chai.expect(v.toLowerCase('456')).to.be.equal('456');
    chai.expect(v.toLowerCase('')).to.be.equal('');
  });

  it('should return the lower case of a string representation of an object', function () {
    chai.expect(v.toLowerCase(['Venus'])).to.be.equal('venus');
    chai.expect(v.toLowerCase({
      toString: function toString() {
        return 'Venus';
      }
    })).to.be.equal('venus');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.toLowerCase()).to.be.equal('');
    chai.expect(v.toLowerCase(undefined)).to.be.equal('');
    chai.expect(v.toLowerCase(null)).to.be.equal('');
  });
});

describe('toUpperCase', function () {

  it('should return the upper case of a string', function () {
    chai.expect(v.toUpperCase('Saturn')).to.be.equal('SATURN');
    chai.expect(v.toUpperCase('Earth')).to.be.equal('EARTH');
    chai.expect(v.toUpperCase('456')).to.be.equal('456');
    chai.expect(v.toUpperCase('')).to.be.equal('');
  });

  it('should return the upper case of a string representation of an object', function () {
    chai.expect(v.toUpperCase(['Venus'])).to.be.equal('VENUS');
    chai.expect(v.toUpperCase({
      toString: function toString() {
        return 'Venus';
      }
    })).to.be.equal('VENUS');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.toUpperCase()).to.be.equal('');
    chai.expect(v.toUpperCase(undefined)).to.be.equal('');
    chai.expect(v.toUpperCase(null)).to.be.equal('');
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
    chai.expect(v.trim(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
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
    chai.expect(v.trimLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
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
    chai.expect(v.trimRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
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
    chai.expect(v.endsWith(PRINTABLE_ASCII, '~')).to.be.true;
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
    chai.expect(v.includes(PRINTABLE_ASCII, '+')).to.be.true;
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
    chai.expect(v.isAlpha('mañana')).to.be.true;
    chai.expect(v.isAlpha('foõ͜͝͞bar')).to.be.true;
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
    chai.expect(v.isAlpha(PRINTABLE_ASCII)).to.be.false;
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
    chai.expect(v.isAlphaDigit('mañana')).to.be.true;
    chai.expect(v.isAlphaDigit('foõ͜͝͞bar')).to.be.true;
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
    chai.expect(v.isAlphaDigit(PRINTABLE_ASCII)).to.be.false;
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
    chai.expect(v.isBlank(PRINTABLE_ASCII)).to.be.false;
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
    chai.expect(v.isDigit(PRINTABLE_ASCII)).to.be.false;
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
    chai.expect(v.isEmpty(PRINTABLE_ASCII)).to.be.false;
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
    chai.expect(v.isLowerCase(PRINTABLE_ASCII)).to.be.false;
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
    chai.expect(v.isNumeric(PRINTABLE_ASCII)).to.be.false;
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
    chai.expect(v.isString(PRINTABLE_ASCII)).to.be.true;
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
    chai.expect(v.isUpperCase(PRINTABLE_ASCII)).to.be.false;
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
    chai.expect(v.matches(PRINTABLE_ASCII, '\s')).to.be.true;
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
    chai.expect(v.startsWith(PRINTABLE_ASCII, ' ')).to.be.true;
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

describe('chars', function () {

  it('should split a string into characters', function () {
    chai.expect(v.chars('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    chai.expect(v.chars('   ')).to.eql([' ', ' ', ' ']);
    chai.expect(v.chars('\n\t')).to.eql(['\n', '\t']);
    chai.expect(v.chars('')).to.eql([]);
    chai.expect(v.chars(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a number into characters', function () {
    chai.expect(v.chars(0)).to.eql(['0']);
    chai.expect(v.chars(1560)).to.eql(['1', '5', '6', '0']);
    chai.expect(v.chars(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(v.chars(['star'])).to.eql(['s', 't', 'a', 'r']);
    chai.expect(v.chars({
      toString: function toString() {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });

  it('should return an empty array of characters for null and undefined', function () {
    chai.expect(v.chars()).to.eql([]);
    chai.expect(v.chars(undefined)).to.eql([]);
    chai.expect(v.chars(null)).to.eql([]);
  });
});

describe('charsCodePoint', function () {

  it('should split a string into characters', function () {
    chai.expect(v.charsCodePoint('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    chai.expect(v.charsCodePoint('   ')).to.eql([' ', ' ', ' ']);
    chai.expect(v.charsCodePoint('\n\t')).to.eql(['\n', '\t']);
    chai.expect(v.charsCodePoint('')).to.eql([]);
    chai.expect(v.charsCodePoint(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a string into surrogate pairs and diacritical marks characters', function () {
    chai.expect(v.charsCodePoint('mañana')).to.eql(['m', 'a', 'ñ', 'a', 'n', 'a']);
    chai.expect(v.charsCodePoint('é⃝')).to.eql(['é⃝']);
    chai.expect(v.charsCodePoint('𝐀𝐁')).to.eql(['𝐀', '𝐁']);
    chai.expect(v.charsCodePoint('café')).to.eql(['c', 'a', 'f', 'é']);
    chai.expect(v.charsCodePoint('foõ͜͝͞bar')).to.eql(['f', 'o', 'õ͜͝͞', 'b', 'a', 'r']);
    chai.expect(v.charsCodePoint('foo𝌆̃͜͝͞bar')).to.eql(['f', 'o', 'o', '𝌆̃͜͝͞', 'b', 'a', 'r']);
  });

  it('should split a number into characters', function () {
    chai.expect(v.charsCodePoint(0)).to.eql(['0']);
    chai.expect(v.charsCodePoint(1560)).to.eql(['1', '5', '6', '0']);
    chai.expect(v.charsCodePoint(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(v.charsCodePoint(['star'])).to.eql(['s', 't', 'a', 'r']);
    chai.expect(v.charsCodePoint({
      toString: function toString() {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });

  it('should return an empty array of characters for null and undefined', function () {
    chai.expect(v.charsCodePoint()).to.eql([]);
    chai.expect(v.charsCodePoint(undefined)).to.eql([]);
    chai.expect(v.charsCodePoint(null)).to.eql([]);
  });
});

describe('split', function () {

  it('should split a string into chunks', function () {
    chai.expect(v.split('stellar bomb', ' ')).to.eql(['stellar', 'bomb']);
    chai.expect(v.split('   ', ' ')).to.eql(['', '', '', '']);
    chai.expect(v.split('dying star', /\s/)).to.eql(['dying', 'star']);
    chai.expect(v.split('*dying*star*', /\*/)).to.eql(['', 'dying', 'star', '']);
    chai.expect(v.split('', '')).to.eql([]);
    chai.expect(v.split('star', '')).to.eql(['s', 't', 'a', 'r']);
  });

  it('should split a number into chunks', function () {
    chai.expect(v.split(0)).to.eql(['0']);
    chai.expect(v.split(1560, '6')).to.eql(['15', '0']);
    chai.expect(v.split(-1.6, /\./)).to.eql(['-1', '6']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(v.split('rising star', ' ')).to.eql(['rising', 'star']);
    chai.expect(v.split({
      toString: function toString() {
        return 'rising-star';
      }
    }, /\-/)).to.eql(['rising', 'star']);
  });

  it('should return the string as an item of an array for an empty separator', function () {
    chai.expect(v.split('star')).to.eql(['star']);
    chai.expect(v.split('star', null)).to.eql(['star']);
    chai.expect(v.split('star', undefined)).to.eql(['star']);
  });
});

describe('words', function () {

  it('should split the string into words', function () {
    chai.expect(v.words('123')).to.eql(['123']);
    chai.expect(v.words('hello')).to.eql(['hello']);
    chai.expect(v.words('  hello   ')).to.eql(['hello']);
    chai.expect(v.words('hello world')).to.eql(['hello', 'world']);
    chai.expect(v.words('12+14-18*400')).to.eql(['12', '14', '18', '400']);
    chai.expect(v.words('gravity can cross dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('-gravity-can-cross-dimensions-')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('gravity_can_cross_dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('*gravity***can****cross&&dimensions++')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('GravityCanCrossDimensions')).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    chai.expect(v.words('GRAVITYCan')).to.eql(['GRAVITY', 'Can']);
    chai.expect(v.words('GravityCan')).to.eql(['Gravity', 'Can']);
    chai.expect(v.words('GravityCANAttract')).to.eql(['Gravity', 'CAN', 'Attract']);
    chai.expect(v.words('gravityCan')).to.eql(['gravity', 'Can']);
    chai.expect(v.words('Gravity-Can11Cross **Dimensions1Foo')).to.eql(['Gravity', 'Can', '11', 'Cross', 'Dimensions', '1', 'Foo']);
    chai.expect(v.words('Cooper... Cooper... Come in, Cooper.')).to.eql(['Cooper', 'Cooper', 'Come', 'in', 'Cooper']);
    chai.expect(v.words('Newton\'s third law')).to.eql(['Newton', 's', 'third', 'law']);
    chai.expect(v.words('Newton\'s thIrd lAw')).to.eql(['Newton', 's', 'th', 'Ird', 'l', 'Aw']);
    chai.expect(v.words(PRINTABLE_ASCII)).to.eql(['0123456789', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz']);
    chai.expect(v.words('')).to.eql([]);
    chai.expect(v.words()).to.eql([]);
    chai.expect(v.words(' ')).to.eql([]);
    chai.expect(v.words('     ')).to.eql([]);
    chai.expect(v.words('\n')).to.eql([]);
    chai.expect(v.words('***')).to.eql([]);
    chai.expect(v.words('***---')).to.eql([]);
    chai.expect(v.words('***---')).to.eql([]);
    chai.expect(v.words('mañana')).to.eql(['mañana']);
    chai.expect(v.words('maÑana')).to.eql(['ma', 'Ñana']);
    chai.expect(v.words('foõ͜͝͞ bar')).to.eql(['foõ͜͝͞', 'bar']);
    chai.expect(v.words('fo-O-Õ͜͝͞-bar')).to.eql(['fo', 'O', 'Õ͜͝͞', 'bar']);
  });

  it('should split the string with diacritics and non-latin characters into words', function () {
    chai.expect(v.words('Στις αρχές του 21ου αιώνα')).to.eql(['Στις', 'αρχές', 'του', '21', 'ου', 'αιώνα']);
    chai.expect(v.words('Гравитация притягивает все')).to.eql(['Гравитация', 'притягивает', 'все']);
    chai.expect(v.words('ГравитацияПритягиваетВСЕ')).to.eql(['Гравитация', 'Притягивает', 'ВСЕ']);
    chai.expect(v.words('clasificación biológica.')).to.eql(['clasificación', 'biológica']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(v.words(['GravityCanCrossDimensions'])).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    chai.expect(v.words({
      toString: function toString() {
        return 'Gr4v1ty';
      }
    })).to.eql(['Gr', '4', 'v', '1', 'ty']);
  });

  it('should split the string into words using a pattern', function () {
    chai.expect(v.words('1234567890', /\d/g)).to.eql(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    chai.expect(v.words('gravity', /\w{1,2}/g)).to.eql(['gr', 'av', 'it', 'y']);
    chai.expect(v.words('gravity can cross dimensions', '\\w+(?=\\s?)', 'g')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('1234567890', /\s/g)).to.eql([]);
  });

  it('should split the string with default pattern for null and undefined', function () {
    chai.expect(v.words('gravity_can_cross_dimensions', null)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('gravity_can_cross_dimensions', undefined)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
  });
});
//# sourceMappingURL=test-bundle.js.map