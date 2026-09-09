import { mask } from '../../../../../functions/esm/esm/default/02-rebind-const.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
