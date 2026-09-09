import { mask } from '../../../../../functions/cjs/cjs/local/01-literal.cjs';

%PrepareFunctionForOptimization(mask);
mask(1);
%OptimizeFunctionOnNextCall(mask);
mask(2);
