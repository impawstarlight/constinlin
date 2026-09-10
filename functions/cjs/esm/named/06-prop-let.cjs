let mod = require('#constants/esm/named.mjs');
function mask(x) {
  return x & mod.MASK;
}
module.exports = mask;
