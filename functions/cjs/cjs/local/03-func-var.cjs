function mask(x) {
  var MASK = 0xFFFF;
  return x & MASK;
}
module.exports = mask;
