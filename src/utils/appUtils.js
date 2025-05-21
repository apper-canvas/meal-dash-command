// Re-export the getIcon function from iconUtils
export { getIcon } from './iconUtils';

/**
 * Format a number as Indian Rupees
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string with ₹ symbol
 */
export const formatCurrency = (amount) => {
  // Format as Indian Rupees with comma separators
  return `₹${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};