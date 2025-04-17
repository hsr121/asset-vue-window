
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

// Format a number as a market cap (e.g., $1.2B)
export const formatMarketCap = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${formatCurrency(value / 1_000_000_000)}B`;
  } else if (value >= 1_000_000) {
    return `${formatCurrency(value / 1_000_000)}M`;
  } else if (value >= 1_000) {
    return `${formatCurrency(value / 1_000)}K`;
  } else {
    return formatCurrency(value);
  }
};

// Format a number as volume (e.g., 1.2M)
export const formatVolume = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  } else {
    return value.toString();
  }
};

// Get CSS class based on LTV value
export const getLtvClass = (ltv: number): string => {
  if (ltv > 80) {
    return "text-financial-red";
  } else if (ltv > 65) {
    return "text-financial-highlight";
  } else {
    return "text-financial-green";
  }
};
