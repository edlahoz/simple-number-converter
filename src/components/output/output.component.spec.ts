import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutputComponent } from './output.component';
import { StoreService } from '../../services/store.service';

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;
  let storeService: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    const storeServiceSpy = jasmine.createSpyObj('StoreService', [
      'getFinancialNumber',
    ]);
    storeServiceSpy.getFinancialNumber.and.returnValue('1,000,000');

    await TestBed.configureTestingModule({
      imports: [OutputComponent],
      providers: [{ provide: StoreService, useValue: storeServiceSpy }],
    }).compileComponents();

    storeService = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set fullNumber on initialization', () => {
    expect(component.fullNumber).toBe('1,000,000');
  });

  it('should call getFinancialNumber on StoreService with true', () => {
    expect(storeService.getFinancialNumber).toHaveBeenCalledWith(true);
  });
});
