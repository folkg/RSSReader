export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return `${day}, ${month} ${date.getDate()}, ${year}, ${time}`;
}
