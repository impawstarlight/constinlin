import { MASK as _MASK } from '../../constants/named.mjs';

const MASK = _MASK;

function mask(x) {
  return x & MASK;
}

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
