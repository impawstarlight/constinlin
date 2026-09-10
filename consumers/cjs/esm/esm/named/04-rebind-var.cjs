const mask = require('#functions/esm/esm/named/04-rebind-var.mjs').default;

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
