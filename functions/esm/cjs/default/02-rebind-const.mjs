import _MASK from '#constants/cjs/default.cjs';
const MASK = _MASK;
export function mask(x) {
  return x & MASK;
}
export default mask;
