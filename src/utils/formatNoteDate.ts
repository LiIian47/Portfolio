
const formatNoteDate = (date: Date): string => {
  if (isNaN(date.getTime())) {
    return "Date inconnue";
  }

  const dateStr = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeStr = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).replace(":", "h");

  return `${dateStr} à ${timeStr}`;
};

export default formatNoteDate;
