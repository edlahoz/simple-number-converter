import numbro from 'numbro';

export function utilFormatNumber(value: string): string {
  try {
    const formattedNumber: string = numbro(value).format({
      thousandSeparated: true,
    });
    if (formattedNumber === undefined || String(formattedNumber) === 'NaN') {
      return '';
    }
    return formattedNumber;
  } catch {
    return '';
  }
}
