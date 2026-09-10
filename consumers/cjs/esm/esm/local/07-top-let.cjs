const mask = require('#functions/esm/esm/local/07-top-let.mjs').default;

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
