import { mask } from '#functions/cjs/esm/named/06-prop-let.cjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
