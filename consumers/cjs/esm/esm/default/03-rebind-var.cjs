const mask = require('#functions/esm/esm/default/03-rebind-var.mjs').default;

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
