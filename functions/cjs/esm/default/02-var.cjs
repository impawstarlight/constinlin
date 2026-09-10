var MASK = require('#constants/esm/default.mjs').default;
function mask(x) {
  return x & MASK;
}
module.exports = mask;
