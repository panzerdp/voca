import isString from '../query/is_string';

export default function(value) {
  if (typeof value === 'undefined' || value === null) {
    return null;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}