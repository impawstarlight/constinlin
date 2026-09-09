const { mask } = require('../../../../../functions/cjs/cjs/local/02-func-const.cjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
