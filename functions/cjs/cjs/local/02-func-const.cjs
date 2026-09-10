function mask(x) {
  const MASK = 0xFFFF;
  return x & MASK;
}
module.exports = mask;
