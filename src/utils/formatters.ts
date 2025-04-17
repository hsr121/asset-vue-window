
// Format a number with commas (e.g., 1,234,567)
export const formatNumber = (value: number, minimumFractionDigits = 0, maximumFractionDigits = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
};

// Format a number as currency (e.g., $1,234.56)
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Format a number as a percentage (e.g., +1.23%)
export const formatPercent = (value: number): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100)}`;
};

// Format a risk rating
export const formatRiskRating = (rating: 'low' | 'medium' | 'high'): string => {
  return rating.charAt(0).toUpperCase() + rating.slice(1);
};
