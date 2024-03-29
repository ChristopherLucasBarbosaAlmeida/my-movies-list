export function formatDate(date: string) {
  const convertedDate = new Date(date);
  return new Intl.DateTimeFormat("pt-br", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(convertedDate);
}
