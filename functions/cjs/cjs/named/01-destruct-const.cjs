const { MASK } = require('../../../../constants/cjs/named.cjs');
function mask(x) {
  return x & MASK;
}
module.exports = mask;
module.exports.mask = mask;
module.exports.default = mask;
