import { MASK as _MASK } from '../../../../constants/esm/named.mjs';
let MASK = _MASK;
export function mask(x) {
  return x & MASK;
}
export default mask;
