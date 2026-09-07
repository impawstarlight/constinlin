let mod = require('../../../esm/constants/named.mjs');

function mask(x) {
  return x & mod.MASK;
}

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
