import _MASK from '#constants/esm/default.mjs';
let MASK = _MASK;
function mask(x) {
  return x & MASK;
}
export default mask;
