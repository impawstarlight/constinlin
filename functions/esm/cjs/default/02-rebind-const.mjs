import _MASK from '#constants/cjs/default.cjs';
const MASK = _MASK;
function mask(x) {
  return x & MASK;
}
export default mask;
