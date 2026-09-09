import _MASK from '#constants/esm/default.mjs';
let MASK = _MASK;
export function mask(x) {
  return x & MASK;
}
export default mask;
