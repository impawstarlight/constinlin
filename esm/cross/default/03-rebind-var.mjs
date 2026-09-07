import _MASK from '../../../cjs/constants/default.cjs';

var MASK = _MASK;

function mask(x) {
  return x & MASK;
}

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
