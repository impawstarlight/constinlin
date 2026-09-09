import { mask } from '../../../../../functions/esm/cjs/named/05-rebind-let.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
