import mask from '#functions/esm/esm/default/03-rebind-var.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
