const { mask } = require('../../../../../functions/esm/esm/local/02-func-const.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
