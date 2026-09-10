const mask = require('#functions/esm/cjs/named/05-rebind-let.mjs').default;

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
