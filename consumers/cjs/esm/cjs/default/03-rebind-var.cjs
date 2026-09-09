const { mask } = require('#functions/esm/cjs/default/03-rebind-var.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
