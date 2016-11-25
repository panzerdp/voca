let globalObject = null;

function getGlobalObject() {
  if (globalObject !== null) {
    return globalObject;
  }
  /* istanbul ignore next */
  // It's hard to mock the global variables. This code surely works fine. I hope :)
  if (typeof global === 'object' && global.Object === Object) {
    // NodeJS global object
    globalObject = global;
  } else if (typeof self === 'object' && self.Object === Object) {
    // self property from Window object
    globalObject = self;
  } else {
    // Other cases. Function constructor always has the context as global object
    globalObject = new Function('return this')();
  }
  return globalObject;
}

export default getGlobalObject;