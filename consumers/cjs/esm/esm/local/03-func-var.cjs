const { mask } = require('#functions/esm/esm/local/03-func-var.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
