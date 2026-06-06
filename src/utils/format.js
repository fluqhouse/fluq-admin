/**
 * Format a UTC date string from the backend for display.
 * Assumes the backend preserves the exact time sent.
 * @param {string} dateString - UTC date string from backend, e.g., "2025-12-08T06:15:00.000Z"
 * @returns {string} Formatted date/time string for display, e.g., "Dec 8, 2025, 6:15 AM"
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: true,
  });
};

/**
 * Convert a datetime-local input value to a UTC ISO string for backend.
 * @param {string} localDateTime - value from <input type="datetime-local">, e.g., "2025-12-08T09:30"
 * @returns {string} UTC ISO string, e.g., "2025-12-08T09:30:00.000Z"
 */
export const toUTC = (localDateTime) => {
  if (!localDateTime) return null;
  return new Date(localDateTime).toISOString();
};

/**
 * Convert a UTC string from backend to a datetime-local input value.
 * Simply trims the ISO string to "YYYY-MM-DDTHH:MM" format for the input.
 * @param {string} utcString - e.g., "2025-12-08T09:30:00.000Z"
 * @returns {string} e.g., "2025-12-08T09:30"
 */
export const utcToLocalInput = (utcString) => {
  if (!utcString) return "";

  const date = new Date(utcString);
  const offset = date.getTimezoneOffset(); // in minutes
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
};
  

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};
