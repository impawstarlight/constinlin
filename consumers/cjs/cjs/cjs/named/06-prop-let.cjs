const mask = require('#functions/cjs/cjs/named/06-prop-let.cjs');

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
