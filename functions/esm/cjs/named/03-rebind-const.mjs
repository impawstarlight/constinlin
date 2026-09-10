import { MASK as _MASK } from '#constants/cjs/named.cjs';
const MASK = _MASK;
function mask(x) {
  return x & MASK;
}
export default mask;
