import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerCommands } from './state/actions/customer.actions';
@Component({
  selector: 'ht-data-stuff',
  templateUrl: './data-stuff.component.html',
  styleUrls: ['./data-stuff.component.css'],
})
export class DataStuffComponent {
  constructor(store: Store) {
    store.dispatch(CustomerCommands.load());
  }
}
