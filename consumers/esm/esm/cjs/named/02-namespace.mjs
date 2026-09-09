import { mask } from '../../../../../functions/esm/cjs/named/02-namespace.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
