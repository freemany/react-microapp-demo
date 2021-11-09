const callbackStack = {};
const resultStack = {};

export const pub = (key, data) => {
  let shortCurcuit;
  const item = undefined === data ? null : data;

  if (undefined === callbackStack[key]) {
    callbackStack[key] = [];
  }

  resultStack[key] = item;

  for (let i = 0; i < callbackStack[key].length; i++) {
    shortCurcuit = callbackStack[key][i](item);
    if (undefined !== shortCurcuit) {
      return shortCurcuit;
    }
  }
};

export const sub = (key, callback) => {
  if (typeof callback !== "function") {
    return null;
  }

  if (undefined === callbackStack[key]) {
    callbackStack[key] = [];
  }
  callbackStack[key].push(callback);

  if (undefined !== resultStack[key]) {
    callback(resultStack[key]);
  }
};

export const subOnce = (key, callback) => {
  if (callbackStack[key]) {
    return;
  }

  sub(key, callback);
};

export const subLast = (key, callback) => {
  if (typeof callback !== "function") {
    return null;
  }

  if (undefined === callbackStack[key]) {
    callbackStack[key] = [];
  }
  callbackStack[key] = [callback];

  if (undefined !== resultStack[key]) {
    callback(resultStack[key]);
  }
};
