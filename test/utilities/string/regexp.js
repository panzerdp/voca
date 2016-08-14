/**
 * Regular expression to match the library version.
 * @see http://semver.org/
 * @type {RegExp}
 */
export var REGEXP_SEMVER = /\bv?(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/ig;