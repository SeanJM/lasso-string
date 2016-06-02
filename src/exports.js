// Check the environment

if (typeof module === 'object') {
  module.exports = lasso;
} else if (typeof window === 'object') {
  window.lasso = lasso;
}
