import mask from '#functions/cjs/esm/named/04-prop-const.cjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
