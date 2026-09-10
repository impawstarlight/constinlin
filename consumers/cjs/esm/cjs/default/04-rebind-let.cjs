const mask = require('#functions/esm/cjs/default/04-rebind-let.mjs').default;

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
