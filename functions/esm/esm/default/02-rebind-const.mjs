import _MASK from '#constants/esm/default.mjs';
const MASK = _MASK;
function mask(x) {
  return x & MASK;
}
export default mask;
