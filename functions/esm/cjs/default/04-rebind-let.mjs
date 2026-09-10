import _MASK from '#constants/cjs/default.cjs';
let MASK = _MASK;
function mask(x) {
  return x & MASK;
}
export default mask;
