import { useEffect, useState } from "react";

function formatMenuBarDate(dateInput: Date) {
  const formatted = dateInput.toLocaleString("fr-FR", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).replace(/,/g, "");
  
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function useFormattedDate(refreshIntervalMs = 30000) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), refreshIntervalMs);
    return () => clearInterval(id);
  }, [refreshIntervalMs]);

  return formatMenuBarDate(now);
}

export default formatMenuBarDate;