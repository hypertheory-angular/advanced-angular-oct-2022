import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCustomerListModel } from '../../state';
import { map } from 'rxjs';

@Component({
  selector: 'ht-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  // A++ - if Each component only selects ONE thing from the state.
  model$ = this.store.select(selectCustomerListModel);

  constructor(private readonly store: Store) {}
}
