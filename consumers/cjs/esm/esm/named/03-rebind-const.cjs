const { mask } = require('../../../../../functions/esm/esm/named/03-rebind-const.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
