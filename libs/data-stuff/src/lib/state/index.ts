import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromCustomers from './reducers/customers.reducer';
import * as fromModels from '../models';
import { LoadingModes, selectUrl } from '@ht/shared';
export const featureName = 'data-stuff';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DataStuffState {
  customers: fromCustomers.CustomersState;
}

export const reducers: ActionReducerMap<DataStuffState> = {
  customers: fromCustomers.reducer,
};

// 1. Feature Selector
const selectFeature = createFeatureSelector<DataStuffState>(featureName);

// 2. A Selector Per Branch of the Feature

const selectCustomersBranch = createSelector(selectFeature, (f) => f.customers);

// 3. Helpers (optional)
const {
  selectAll: selectAllCustomerEntityArray,
  selectEntities: selectCustomerEntities,
} = fromCustomers.adapter.getSelectors(selectCustomersBranch);

const selectCustomersLoaded = createSelector(
  selectCustomersBranch,
  (b) => b.loaded,
);
const selectCustomersErrored = createSelector(
  selectCustomersBranch,
  (b) => b.errored,
);
// 4. What your Components Need

// if they are at the /crm url (the end of contains /crm)
// and the data is currently loaded, then yeah, we need to load the data.
const paths = {
  crm: /\/crm/i,
};
export const selectCustomersNeedLoaded = createSelector(
  selectUrl,
  selectCustomersLoaded,
  (url, loaded) => {
    return !loaded && !!url.match(paths.crm);
  },
);

export const selectCustomerDetails = (id: string) =>
  createSelector(
    selectCustomerEntities,
    selectCustomersLoaded,
    selectCustomersErrored,
    (customers, loaded, errored) => {
      const customer = customers[id];
      if (customer) {
        return {
          ...customer,
          loading: false,
          errored: errored,
          empty: false,
        } as fromModels.CustomerDetailsItem & LoadingModes;
      } else {
        return null;
      }
    },
  );

export const selectCustomerListModel = createSelector(
  selectAllCustomerEntityArray,
  selectCustomersLoaded,
  selectCustomersErrored,
  (customers, loaded, errored) => {
    const result: fromModels.CustomerSummaryList & LoadingModes = {
      loading: !loaded,
      errored,
      empty: customers.length === 0,
      data: customers.map(
        (cust) =>
          ({
            id: cust.id,
            firstName: cust.firstName,
            lastName: cust.lastName,
            company: cust.company,
          } as fromModels.CustomerSummaryListItem),
      ),
    };
    return result;
  },
);
