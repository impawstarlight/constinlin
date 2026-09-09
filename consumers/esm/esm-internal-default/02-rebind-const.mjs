import { mask } from '../../../functions/esm/internal/default/02-rebind-const.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
