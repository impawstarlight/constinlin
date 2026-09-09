import { mask } from '../../../functions/esm/internal/named/01-import.mjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
