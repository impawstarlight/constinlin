const { mask } = require('../../../functions/cjs/internal/default/01-const.cjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
