function mask(x) {
  let MASK = 0xFFFF;
  return x & MASK;
}
module.exports = mask;
