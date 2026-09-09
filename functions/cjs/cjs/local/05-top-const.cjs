const MASK = 0xFFFF;
function mask(x) {
  return x & MASK;
}
module.exports = mask;
module.exports.mask = mask;
module.exports.default = mask;
