export function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`;
  }
  return `$${value}`;
}

export function formatFullCurrency(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export function formatShares(shares: number): string {
  return `${shares.toLocaleString("en-US")} shares`;
}

export function formatFiledAt(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
