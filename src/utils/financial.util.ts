export function utilFormatNumber(value: string): string {
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value));
  return formattedNumber;
}

export function utilFormatFinancialNumber(value: string): string {
  const regex = /^[0-9]*\.?[0-9]+[kKmMbB]?$/;
  if (value.match(regex) === null) {
    return '';
  }
  const lastChar = value[value.length - 1];
  if (lastChar.match(/[0-9]/) !== null) {
    return utilFormatNumber(value);
  }
  let rawNumber = value.slice(0, -1);
  switch (lastChar) {
    case 'k':
    case 'K':
      rawNumber = `${rawNumber}000`;
      break;
    case 'm':
    case 'M':
      rawNumber = `${rawNumber}000000`;
      break;
    case 'b':
    case 'B':
      rawNumber = `${rawNumber}000000000`;
      break;
  }
  return utilFormatNumber(rawNumber);
}
