import { mask } from '../../../../../functions/esm/esm/local/07-top-let.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
