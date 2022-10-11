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
const selectSelectedCustomerId = createSelector(
  selectCustomersBranch,
  (b) => b.selectedCustomerId,
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

export const selectCustomerDetails = createSelector(
  selectCustomerEntities,
  selectCustomersLoaded,
  selectCustomersErrored,
  selectSelectedCustomerId,
  (customers, loading, errored, id) => {
    if (id === undefined) {
      return undefined;
    }
    const customer = customers[id];
    if (customer) {
      const result: fromModels.CustomerDetailsItem & LoadingModes = {
        ...customer,
        loading: !loading,
        errored: errored,
        empty: false,
      };
      return result;
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
        (cust): fromModels.CustomerSummaryListItem => ({
          id: cust.id,
          firstName: cust.firstName,
          lastName: cust.lastName,
          fullName: `${cust.firstName} ${cust.lastName}`,
          company: cust.company,
        }),
      ),
    };
    return result;
  },
);
