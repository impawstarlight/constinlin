import { mask } from '../../../functions/cjs/local/03-func-var.cjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
