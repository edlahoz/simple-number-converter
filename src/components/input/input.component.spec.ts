import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputComponent } from './input.component';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let storeService: jasmine.SpyObj<StoreService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const storeServiceSpy = jasmine.createSpyObj('StoreService', [
      'setFinancialNumber',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputComponent],
      providers: [
        FormBuilder,
        { provide: StoreService, useValue: storeServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    storeService = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required and custom validators', () => {
    const financialNumberControl = component.form.get('financialNumber');
    expect(financialNumberControl).toBeTruthy();
    expect(financialNumberControl?.hasError('required')).toBeTrue();

    // Set an invalid value to check custom validator
    financialNumberControl?.setValue('invalid value');

    fixture.detectChanges();
    expect(
      financialNumberControl?.hasError('financialNumberInvalid')
    ).toBeTrue();
  });

  it('should call setFinancialNumber and navigate on form submit with valid input', () => {
    component.form.get('financialNumber')?.setValue('250k');
    component.form.markAllAsTouched();
    component.onSubmit();
    expect(storeService.setFinancialNumber).toHaveBeenCalledWith('250k');
    expect(router.navigate).toHaveBeenCalledWith(['/output']);
  });

  it('should not call setFinancialNumber or navigate if form is invalid', () => {
    component.form.get('financialNumber')?.setValue('');
    component.form.markAllAsTouched();
    component.onSubmit();
    expect(storeService.setFinancialNumber).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not display validation error messages when form is invalid but is not dirty', async () => {
    component.form.get('financialNumber')?.setValue('');
    component.form.get('financialNumber')?.markAsTouched();
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const errorMessages = compiled.querySelectorAll('small');
    expect(errorMessages.length).toBe(0);
  });
});
