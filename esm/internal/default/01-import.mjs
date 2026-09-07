import MASK from '../../constants/default.mjs';

function mask(x) {
  return x & MASK;
}

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
