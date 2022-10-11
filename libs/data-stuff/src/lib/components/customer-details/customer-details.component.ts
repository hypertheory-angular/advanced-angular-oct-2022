import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCustomerDetails } from '../../state';

@Component({
  selector: 'ht-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent {
  customer$ = this.store.select(selectCustomerDetails);
  constructor(private store: Store) {}
}
