import { utilFormatNumber } from './financial.util';
import numbro from 'numbro';

describe('utilFormatNumber', () => {
  it('should format numbers with thousand separators correctly', () => {
    expect(utilFormatNumber('2500')).toBe('2,500');
  });

  it('should return an empty string for invalid inputs', () => {
    expect(utilFormatNumber('invalid')).toBe('');
  });

  it('should return an empty string if numbro throws an error', () => {
    expect(utilFormatNumber('invalid')).toBe('');
  });
});
