/**
 * Format a number as Indian Rupees using en-IN locale.
 * e.g. 500000 → "₹5,00,000"
 */
export const formatINR = (amount: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

/**
 * Compact format for large amounts.
 * e.g. 4200000 → "₹42L", 10000000 → "₹1Cr"
 */
export const formatCompact = (amount: number): string => {
  if (amount >= 1_00_00_000)
    return `₹${(amount / 1_00_00_000).toFixed(1)}Cr`;
  if (amount >= 1_00_000)
    return `₹${(amount / 1_00_000).toFixed(1)}L`;
  return formatINR(amount);
};

/**
 * Format a YYYY-MM-DD string to DD MMM YYYY.
 * e.g. "2026-02-15" → "15 Feb 2026"
 */
export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Capitalise first letter of a string.
 */
export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);
