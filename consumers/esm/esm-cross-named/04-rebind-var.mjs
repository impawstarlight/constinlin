import { mask } from '../../../functions/esm/cross/named/04-rebind-var.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
