import { AbstractControl, ValidatorFn } from '@angular/forms';
import { utilFormatNumber } from '../../utils/financial.util';

export function financialNumberValidator(): ValidatorFn {
  return ({ value }: AbstractControl) => {
    const formattedValue = utilFormatNumber(value);
    return formattedValue === '' ? { financialNumberInvalid: true } : null;
  };
}
