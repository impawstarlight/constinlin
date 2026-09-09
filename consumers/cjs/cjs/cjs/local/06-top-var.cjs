const { mask } = require('#functions/cjs/cjs/local/06-top-var.cjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
