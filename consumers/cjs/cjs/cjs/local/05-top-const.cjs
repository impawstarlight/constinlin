const mask = require('#functions/cjs/cjs/local/05-top-const.cjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
