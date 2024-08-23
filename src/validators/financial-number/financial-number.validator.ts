import { AbstractControl, ValidatorFn } from '@angular/forms';
import { utilFormatFinancialNumber } from '../../utils/financial.util';

export function financialNumberValidator(): ValidatorFn {
  return ({ value }: AbstractControl) => {
    const formattedValue = utilFormatFinancialNumber(value);
    return formattedValue === '' ? { financialNumberInvalid: true } : null;
  };
}
