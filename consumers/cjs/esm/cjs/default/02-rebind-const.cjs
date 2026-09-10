const mask = require('#functions/esm/cjs/default/02-rebind-const.mjs').default;

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
