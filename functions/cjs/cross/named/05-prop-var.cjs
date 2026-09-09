var mod = require('../../../../constants/esm/named.mjs');
function mask(x) {
  return x & mod.MASK;
}
module.exports = mask;
module.exports.mask = mask;
module.exports.default = mask;
