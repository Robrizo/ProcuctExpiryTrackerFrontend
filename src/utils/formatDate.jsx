import dayjs from "dayjs";

/**
 * Formats a date like: 15 Sept 2026
 * @param {string | Date} date - The date to format
 * @returns {string} Formatted date or "Invalid date"
 */
const formatDate = (date) => {
  if (!date) return "";

  const parsedDate = dayjs(date);

  if (!parsedDate.isValid()) {
    return "Invalid date";
  }

  return parsedDate.format("D MMM YYYY");
};

export default formatDate;
