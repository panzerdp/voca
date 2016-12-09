const HIGH_SURROGATE_START = 0xD800;
const HIGH_SURROGATE_END = 0xDBFF;
const LOW_SURROGATE_START = 0xDC00;
const LOW_SURROGATE_END = 0xDFFF;

/**
 * Checks if `codePoint` is a high-surrogate number from range 0xD800 to 0xDBFF.
 *
 * @ignore
 * @param {number} codePoint The code point number to be verified
 * @return {boolean} Returns a boolean whether `codePoint` is a high-surrogate number.
 */
export function isHighSurrogate(codePoint) {
  return codePoint >= HIGH_SURROGATE_START && codePoint <= HIGH_SURROGATE_END;
}

/**
 * Checks if `codePoint` is a low-surrogate number from range 0xDC00 to 0xDFFF.
 *
 * @ignore
 * @param {number} codePoint The code point number to be verified
 * @return {boolean} Returns a boolean whether `codePoint` is a low-surrogate number.
 */
export function isLowSurrogate(codePoint) {
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
export function getAstralNumberFromSurrogatePair(highSurrogate, lowSurrogate) {
  return (highSurrogate - HIGH_SURROGATE_START) * 0x400 + lowSurrogate - LOW_SURROGATE_START + 0x10000;
}