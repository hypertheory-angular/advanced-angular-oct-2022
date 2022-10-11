import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';
import { selectCustomersNeedLoaded } from '..';
import { CustomerCommands, CustomerEvents } from '../actions/customer.actions';
// prettier-ignore
@Injectable()
export class DataStuffEffects {
  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      tap(() => console.log('Got a navigation')),
      concatLatestFrom(() => this.store.select(selectCustomersNeedLoaded)),
      map(
        ([,result,]) => result,
      ),
      tap((result) => console.log(`Do we need to load the data? ${result}`) ),
      filter((needsLoaded) => needsLoaded), // if false, stop here..
      map(() => CustomerCommands.load()), // time to make the donuts.
    );
  });

  setSelectedCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      map((r) => r.payload.routerState.url.match(/\/crm\/details\/(.*)$/i)),
      map((r) =>  {
          if(r) {
            if(r[1]) {
              
              return CustomerEvents.selected({payload: r[1]});
            } 
            
          }
          return {type: 'BLAM'}
        })
      
    )
  }, { dispatch: true});

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {}
}
