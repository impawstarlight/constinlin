const { mask } = require('#functions/cjs/cjs/named/03-destruct-let.cjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
