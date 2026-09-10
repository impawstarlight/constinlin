const mask = require('#functions/cjs/cjs/local/07-top-let.cjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
