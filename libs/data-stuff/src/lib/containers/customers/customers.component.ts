import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSortedUniqueCustomerRoles } from '../../state';

@Component({
  selector: 'ht-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  roles$ = this.store.select(selectSortedUniqueCustomerRoles);
  constructor(private readonly store: Store) {}
}
