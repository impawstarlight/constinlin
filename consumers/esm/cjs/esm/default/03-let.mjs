import mask from '#functions/cjs/esm/default/03-let.cjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
