import { mask } from '../../../functions/cjs/internal/named/01-destruct-const.cjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
