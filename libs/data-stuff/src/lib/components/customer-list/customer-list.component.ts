import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCustomerListModel } from '../../state';

@Component({
  selector: 'ht-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  model$ = this.store.select(selectCustomerListModel);
  constructor(private readonly store: Store) {}
}
