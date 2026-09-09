import { mask } from '../../../../../functions/esm/esm/default/01-import.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
