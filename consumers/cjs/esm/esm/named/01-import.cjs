const { mask } = require('#functions/esm/esm/named/01-import.mjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
