const { mask } = require('../../../functions/esm/cross/default/02-rebind-const.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
