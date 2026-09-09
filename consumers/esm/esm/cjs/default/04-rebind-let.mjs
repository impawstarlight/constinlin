import { mask } from '#functions/esm/cjs/default/04-rebind-let.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
