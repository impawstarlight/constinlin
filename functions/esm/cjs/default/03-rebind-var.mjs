import _MASK from '#constants/cjs/default.cjs';
var MASK = _MASK;
export function mask(x) {
  return x & MASK;
}
export default mask;
