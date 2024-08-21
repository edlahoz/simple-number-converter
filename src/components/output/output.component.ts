import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [],
  template: '<p>{{ fullNumber }}</p>',
})
export class OutputComponent implements OnInit {
  fullNumber: string = '';

  constructor(private store: StoreService, private router: Router) {}

  ngOnInit() {
    this.fullNumber = this.store.getFinancialNumber(true);
    if (!this.fullNumber) {
      this.router.navigate(['/input']);
    }
  }
}
