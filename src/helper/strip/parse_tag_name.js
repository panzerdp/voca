import { REGEXP_WHITESPACE } from 'helper/reg_exp/const';

const STATE_START_TAG = 0;
const STATE_NON_WHITESPACE = 1;
const STATE_DONE = 2;

/**
 * Parses the tag name from html content.
 *
 * @ignore
 * @param {string} tagContent The tag content.
 * @return {string} Returns the tag name.
 */
export default function parseTagName(tagContent) {
  let state = STATE_START_TAG;
  let tagName = '';
  let index = 0;
  while (state !== STATE_DONE) {
    const char = tagContent[index++].toLowerCase();
    switch (char) {
      case '<':
        break;
      case '>':
        state = STATE_DONE;
        break;
      default:
        if (REGEXP_WHITESPACE.test(char)) {
          if (state === STATE_NON_WHITESPACE) {
            state = STATE_DONE;
          }
        } else {
          if (state === STATE_START_TAG) {
            state = STATE_NON_WHITESPACE;
          }
          if (char !== '/') {
            tagName += char;
          }
        }
        break;
    }
  }
  return tagName;
}