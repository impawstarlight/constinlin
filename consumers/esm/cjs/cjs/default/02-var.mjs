import { mask } from '#functions/cjs/cjs/default/02-var.cjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
