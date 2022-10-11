import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingModes, selectRouteParam } from '@ht/shared';
import { Store } from '@ngrx/store';
import { filter, map, Observable, Subscription, tap } from 'rxjs';
import { CustomerDetailsItem } from '../../models';
import { selectCustomerDetails } from '../../state';

@Component({
  selector: 'ht-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customer$!: Observable<(CustomerDetailsItem & LoadingModes) | null>;
  constructor(private store: Store) {}
  subscriptions: Subscription[] = [];
  ngOnInit(): void {
    const sub = this.store
      .select(selectRouteParam('id'))
      .pipe(
        filter((id) => id !== undefined),
        map((id) => id as string),
        tap(
          (id) =>
            (this.customer$ = this.store.select(selectCustomerDetails(id))),
        ),
      )
      .subscribe();

    this.subscriptions.push(sub);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
