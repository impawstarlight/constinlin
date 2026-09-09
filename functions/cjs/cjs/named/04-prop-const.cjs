const mod = require('#constants/cjs/named.cjs');
function mask(x) {
  return x & mod.MASK;
}
module.exports = mask;
module.exports.mask = mask;
module.exports.default = mask;
