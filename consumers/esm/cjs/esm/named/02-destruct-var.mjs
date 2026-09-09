import { mask } from '../../../../../functions/cjs/esm/named/02-destruct-var.cjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
