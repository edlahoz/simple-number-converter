import { Injectable } from '@angular/core';
import { utilFormatFinancialNumber } from '../utils/financial.util';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private financialNumber: string = '';

  setFinancialNumber(value: string) {
    this.financialNumber = value;
  }

  getFinancialNumber(formatted: boolean = false): string {
    return formatted
      ? utilFormatFinancialNumber(this.financialNumber)
      : this.financialNumber;
  }
}
