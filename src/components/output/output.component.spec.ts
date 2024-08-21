import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutputComponent } from './output.component';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

class MockRouter {
  navigate(commands: any[]) {
    return Promise.resolve(true);
  }
}

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;
  let storeService: jasmine.SpyObj<StoreService>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    const storeServiceSpy = jasmine.createSpyObj('StoreService', [
      'getFinancialNumber',
    ]);
    storeServiceSpy.getFinancialNumber.and.returnValue('1,000,000');

    await TestBed.configureTestingModule({
      imports: [OutputComponent],
      providers: [
        { provide: StoreService, useValue: storeServiceSpy },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    storeService = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate').and.callThrough();
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

  it('should redirect to /input if fullNumber is empty', () => {
    storeService.getFinancialNumber.and.returnValue('');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['/input']);
  });
});
