const mod = require('#constants/cjs/named.cjs');
function mask(x) {
  return x & mod.MASK;
}
module.exports = mask;
