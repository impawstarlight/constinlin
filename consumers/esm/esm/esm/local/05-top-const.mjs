import { mask } from '../../../../../functions/esm/esm/local/05-top-const.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
