var { MASK } = require('#constants/cjs/named.cjs');
function mask(x) {
  return x & MASK;
}
module.exports = mask;
