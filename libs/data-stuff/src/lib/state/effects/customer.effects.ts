import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import {
  CustomerCommands,
  CustomerDocuments,
} from '../actions/customer.actions';
import { CustomerEntity } from '../reducers/customers.reducer';
@Injectable()
export class CustomerEffects {
  readonly url = 'https://api.mycrmsitedotcom.com/customers'; // TODO: Do an environment service tomorrow

  // when we are commanded to load the customers, we will go to that url and get our customers.

  load$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CustomerCommands.load),
        switchMap(() =>
          this.client
            .get<{ data: CustomerEntity[] }>(this.url)
            .pipe(
              map(({ data }) => CustomerDocuments.customers({ payload: data })),
            ),
        ),
      );
    },
    { dispatch: true },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly client: HttpClient,
  ) {}
}
