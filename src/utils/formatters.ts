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

function parseLocalDate(isoDate: string): Date {
  const [datePart, timePart] = isoDate.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = (timePart ?? "00:00").split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
}

export function formatTradeDate(isoDate: string): string {
  return parseLocalDate(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatFiledAt(isoDate: string): string {
  const filed = parseLocalDate(isoDate);
  const hours = String(filed.getHours()).padStart(2, "0");
  const minutes = String(filed.getMinutes()).padStart(2, "0");
  return `${formatTradeDate(isoDate)} · ${hours}:${minutes}`;
}
