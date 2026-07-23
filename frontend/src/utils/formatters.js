export function formatRank(rank) {
  if (!rank) return 'N/A';
  const s = ["th", "st", "nd", "rd"];
  const v = rank % 100;
  return `#${rank}${(s[(v - 20) % 10] || s[v] || s[0])}`;
}

export function formatNumber(num) {
  if (num === null || num === undefined) return 'N/A';
  if (typeof num === 'number') {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  }
  return num;
}

export function getTrendColor(trend, higherIsBetter = true) {
  if (!trend) return 'var(--color-muted)';
  const isPositive = trend === 'improving';
  const isNegative = trend === 'declining';

  if (isPositive) return higherIsBetter ? 'var(--color-success)' : 'var(--color-error)';
  if (isNegative) return higherIsBetter ? 'var(--color-error)' : 'var(--color-success)';
  return 'var(--color-muted)';
}

export function getCategoryCardBg(index) {
  const bgClasses = [
    'feature-card-pink',
    'feature-card-teal',
    'feature-card-lavender',
    'feature-card-peach',
    'feature-card-ochre',
    'feature-card-cream'
  ];
  return bgClasses[index % bgClasses.length];
}
