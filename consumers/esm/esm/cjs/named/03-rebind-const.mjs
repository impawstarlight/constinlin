import { mask } from '../../../../../functions/esm/cjs/named/03-rebind-const.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
