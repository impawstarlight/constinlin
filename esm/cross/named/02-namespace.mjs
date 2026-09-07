import * as mod from '../../../cjs/constants/named.cjs';

function mask(x) {
  return x & mod.MASK;
}

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
