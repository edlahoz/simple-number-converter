import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { financialNumberValidator } from '../../validators/financial-number/financial-number.validator';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label for="financialNumber">Enter a Financial Number:</label>
      <input
        id="financialNumber"
        formControlName="financialNumber"
        type="text"
        placeholder="e.g., 250k, 10m, .5b"
      />
      <div
        *ngIf="
          form.get('financialNumber')?.invalid &&
          form.get('financialNumber')?.dirty
        "
      >
        <small *ngIf="form.get('financialNumber')?.hasError('required')">
          This field is required.
        </small>
        <small
          *ngIf="
            form.get('financialNumber')?.hasError('financialNumberInvalid')
          "
        >
          Invalid format. Please use a valid financial number (e.g., 250k, 10m,
          .5b).
        </small>
      </div>
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
})
export class InputComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: StoreService
  ) {
    this.form = this.fb.group({
      financialNumber: ['', [Validators.required, financialNumberValidator()]],
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const input = this.form.get('financialNumber')!.value;
      this.store.setFinancialNumber(input);
      this.router.navigate(['/output']);
    }
  }
}
