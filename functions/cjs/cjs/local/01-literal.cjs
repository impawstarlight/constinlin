function mask(x) {
  return x & 0xFFFF;
}
module.exports = mask;
module.exports.mask = mask;
module.exports.default = mask;
