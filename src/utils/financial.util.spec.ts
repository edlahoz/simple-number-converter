import { utilFormatFinancialNumber, utilFormatNumber } from './financial.util';

describe('utilFormatFinancialNumber', () => {
  it('should format numbers with thousand separators correctly', () => {
    expect(utilFormatFinancialNumber('2500')).toBe('2,500');
  });

  it('should return an empty string for invalid inputs', () => {
    expect(utilFormatFinancialNumber('invalid')).toBe('');
  });

  it('should return an empty string if numbro throws an error', () => {
    expect(utilFormatFinancialNumber('invalid')).toBe('');
  });
});

describe('utilFormatNumber', () => {
  it('should return an appropriate formatted number by the thousands', () => {
    expect(utilFormatNumber('2000')).toBe('2,000');
  });

  it('should return the same value if less than a thousand', () => {
    expect(utilFormatNumber('999')).toBe('999');
  });
});
