import { TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';
import { utilFormatNumber } from '../utils/financial.util';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setFinancialNumber', () => {
    it('should set the financial number', () => {
      const testValue = '500k';
      service.setFinancialNumber(testValue);
      expect(service['financialNumber']).toBe(testValue);
    });
  });

  describe('getFinancialNumber', () => {
    it('should return the unformatted financial number by default', () => {
      const testValue = '1m';
      service.setFinancialNumber(testValue);
      expect(service.getFinancialNumber()).toBe(testValue);
    });

    it('should return the formatted financial number when formatted is true', () => {
      const testValue = '250k';
      const formattedValue = utilFormatNumber(testValue);
      service.setFinancialNumber(testValue);
      expect(service.getFinancialNumber(true)).toBe(formattedValue);
    });
  });
});
