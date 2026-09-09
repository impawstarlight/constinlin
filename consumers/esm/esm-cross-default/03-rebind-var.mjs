import { mask } from '../../../functions/esm/cross/default/03-rebind-var.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
