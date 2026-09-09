const { mask } = require('../../../functions/esm/internal/named/04-rebind-var.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
