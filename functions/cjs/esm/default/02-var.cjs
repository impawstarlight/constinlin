var MASK = require('../../../../constants/esm/default.mjs').default;
function mask(x) {
  return x & MASK;
}
module.exports = mask;
module.exports.mask = mask;
module.exports.default = mask;
