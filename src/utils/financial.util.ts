/**
 * Formats a numeric string to a localized string representation with up to two decimal places.
 *
 * @param {string} value - The numeric string to format.
 * @returns {string} The formatted number string.
 */
export function utilFormatNumber(value: string): string {
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value));
  return formattedNumber;
}

/**
 * Formats a financial numeric string (e.g., "10k", "2M", "3.5b") to a localized string
 * with up to two decimal places. The function handles suffixes like 'k', 'm', and 'b'
 * which represent thousands, millions, and billions respectively.
 *
 * @param {string} value - The financial numeric string to format.
 * @returns {string} The formatted financial number string or an empty string if the input is invalid.
 */
export function utilFormatFinancialNumber(value: string): string {
  const regex = /^[0-9]*\.?[0-9]+[kKmMbB]?$/;
  if (value.match(regex) === null) {
    return '';
  }
  const lastChar = value[value.length - 1];
  if (lastChar.match(/[0-9]/) !== null) {
    return utilFormatNumber(value);
  }
  let rawNumber = Number(value.slice(0, -1));
  switch (lastChar) {
    case 'k':
    case 'K':
      rawNumber = rawNumber * 1000;
      break;
    case 'm':
    case 'M':
      rawNumber = rawNumber * 1000000;
      break;
    case 'b':
    case 'B':
      rawNumber = rawNumber * 1000000000;
      break;
  }
  return utilFormatNumber(String(rawNumber));
}
