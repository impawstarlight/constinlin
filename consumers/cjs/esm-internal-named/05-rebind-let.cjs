const { mask } = require('../../../functions/esm/internal/named/05-rebind-let.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
