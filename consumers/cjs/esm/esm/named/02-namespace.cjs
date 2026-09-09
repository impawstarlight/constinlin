const { mask } = require('../../../../../functions/esm/esm/named/02-namespace.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
