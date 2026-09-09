import { mask } from '../../../functions/cjs/cross/named/05-prop-var.cjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
