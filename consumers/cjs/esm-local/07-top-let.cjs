const { mask } = require('../../../functions/esm/local/07-top-let.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
