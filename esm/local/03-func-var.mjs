function mask(x) {
  var MASK = 0xFFFF;
  return x & MASK;
}

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
