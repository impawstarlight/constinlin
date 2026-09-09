import { mask } from '../../../functions/esm/cross/named/02-namespace.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
