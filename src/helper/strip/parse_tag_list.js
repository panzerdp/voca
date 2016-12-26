import { REGEXP_TAG_LIST } from 'helper/reg_exp/const';

/**
 * Parses the tags from the string '<tag1><tag2>...<tagN>'.
 *
 * @ignore
 * @param {string} tags The string that contains the tags.
 * @return {string[]} Returns the array of tag names.
 */
export default function parseTagList(tags) {
  const tagsList = [];
  let match;
  while ((match = REGEXP_TAG_LIST.exec(tags)) !== null) {
    tagsList.push(match[1]);
  }
  return tagsList;
}