import { MASK as _MASK } from '#constants/esm/named.mjs';
const MASK = _MASK;
export function mask(x) {
  return x & MASK;
}
export default mask;
