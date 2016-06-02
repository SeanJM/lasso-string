function toPercentage (value) {
  if (!value || value === Infinity) {
    value = 0;
  }

  return value + '%';
}
