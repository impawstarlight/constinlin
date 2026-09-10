import mask from '#functions/esm/esm/local/01-literal.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
