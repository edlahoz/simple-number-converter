import { financialNumberValidator } from './financial-number.validator';
import { FormControl } from '@angular/forms';

describe('financialNumberValidator', () => {
  it('should return null for valid financial number formats', () => {
    const control = new FormControl('250k');
    const validatorFn = financialNumberValidator();
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return an error object for invalid financial number formats', () => {
    const control = new FormControl('invalidInput');
    const validatorFn = financialNumberValidator();
    const result = validatorFn(control);
    expect(result).toEqual({ financialNumberInvalid: true });
  });

  it('should return an error object for empty input', () => {
    const control = new FormControl('');
    const validatorFn = financialNumberValidator();
    const result = validatorFn(control);
    expect(result).toEqual({ financialNumberInvalid: true });
  });
});
