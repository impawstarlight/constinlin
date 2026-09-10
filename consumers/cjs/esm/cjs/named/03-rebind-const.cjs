const mask = require('#functions/esm/cjs/named/03-rebind-const.mjs').default;

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
