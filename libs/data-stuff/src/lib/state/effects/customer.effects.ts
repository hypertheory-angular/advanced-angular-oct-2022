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
        ofType(CustomerCommands.load), // when we are asked to load the coustomers
        switchMap(() =>
          // we use switchMap here because it will not track previous requests (cancellable)
          this.client.get<{ data: CustomerFromApi[] }>(this.url).pipe(
            // Go to the "api", tell it what the api returns
            map(({ data }) => data), // just pluck the data property of the result ( { data: CustomerFromApi[]} => CustomerFromApi[])
            map(mapApiCustomersToCustomerEntities), // turn those into CustomerEntity[] ( [CustomerFromApi[] => CustomerEntity[])
            map((payload) => CustomerDocuments.customers({ payload })), // dispatch that!
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

/** An Anti-corruption layer - only take what you want from the API, you don't need it all.  */
function mapApiCustomersToCustomerEntities(
  api: CustomerFromApi[],
): CustomerEntity[] {
  return api.map((a) => {
    const result: CustomerEntity = {
      id: a.id,
      firstName: a.profile.name.first,
      lastName: a.profile.name.last,
      address: a.profile.address,
      dob: a.profile.dob,
      email: a.email,
    };
    return result;
  });
}

// Getting this from the API
/* {
          id: 'f8034ba2-3d7f-4749-a67d-3c353c3c2d4a',
          profile: {
            name: {
              first: 'Lamb',
              last: 'Mack'
            },
            company: 'Candecor',
            dob: '1993-02-24',
            address: '12 Kane Street, Kidder, Wyoming',
            about: 'Ad occaecat voluptate et duis cupidatat quis tempor sint minim et in est et enim. Ipsum officia aute esse veniam deserunt commodo in voluptate nisi sint amet est proident nisi.'
          },
          email: 'lamb@candecor.archi',
          roles: [
            'guest',
            'admin'
          ],
          createdAt: '2020-09-09T05:40:02.670Z',
          updatedAt: '2020-09-10T05:40:02.670Z'
        }
  */

type CustomerFromApi = {
  id: string;
  profile: {
    name: {
      first: string;
      last: string;
    };
    company: string;
    dob: string;
    address: string;
  };
  email: string;
};
