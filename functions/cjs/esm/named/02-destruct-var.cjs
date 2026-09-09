var { MASK } = require('../../../../constants/esm/named.mjs');
function mask(x) {
  return x & MASK;
}
module.exports = mask;
module.exports.mask = mask;
module.exports.default = mask;
