import _MASK from '#constants/esm/default.mjs';
const MASK = _MASK;
export function mask(x) {
  return x & MASK;
}
export default mask;
