import { mask } from '#functions/cjs/cjs/local/04-func-let.cjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
