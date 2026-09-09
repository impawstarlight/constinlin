import { mask } from '../../../functions/esm/internal/named/03-rebind-const.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
