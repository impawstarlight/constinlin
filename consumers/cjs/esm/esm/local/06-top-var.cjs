const { mask } = require('#functions/esm/esm/local/06-top-var.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
