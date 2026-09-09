function mask(x) {
  const MASK = 0xFFFF;
  return x & MASK;
}
module.exports = mask;
module.exports.mask = mask;
module.exports.default = mask;
