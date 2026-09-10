const mask = require('#functions/esm/esm/default/01-import.mjs').default;

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
