function lasso (string) {
  return lasso.chain(string);
};

if (typeof module === 'object') {
  module.exports = lasso;
}
