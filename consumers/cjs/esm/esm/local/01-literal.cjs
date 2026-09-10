const mask = require('#functions/esm/esm/local/01-literal.mjs').default;

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
