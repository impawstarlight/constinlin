const { mask } = require('../../../../../functions/cjs/cjs/default/01-const.cjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
