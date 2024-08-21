import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [],
  template: '<p>{{ fullNumber }}</p>',
})
export class OutputComponent implements OnInit {
  fullNumber: string = '';

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.fullNumber = this.store.getFinancialNumber(true);
  }
}
