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

const selectCustomerLoadingInformation = createSelector(
  selectCustomersLoaded,
  selectCustomersErrored,
  (loaded, errored) => {
    const result: Omit<LoadingModes, 'empty'> = {
      loading: !loaded,
      errored: errored,
    };
    return result;
  },
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
  selectCustomerLoadingInformation,
  selectSelectedCustomerId,
  (customers, modeInfo, id) => {
    if (id === undefined) {
      return undefined;
    }
    const customer = customers[id];
    const modes: LoadingModes = {
      ...modeInfo,
      empty: !customer,
    };
    if (customer) {
      const result: ApiResponseWithModes<fromModels.CustomerDetailsItem> = {
        data: customer,
        modes,
      };
      return result;
    } else {
      const result: ApiResponseWithModes<fromModels.CustomerDetailsItem> = {
        modes,
      };
      return result;
    }
  },
);

type ApiResponseWithModes<T> = {
  modes: LoadingModes;
  data?: T;
};

export const selectCustomerListModel = createSelector(
  selectAllCustomerEntityArray,
  selectCustomerLoadingInformation,
  (customers, loadModes) => {
    const modes: LoadingModes = {
      ...loadModes,
      empty: !customers,
    };
    if (customers) {
      const data: fromModels.CustomerSummaryListItem[] = customers.map(
        convertCustomerEntityToCustomerSummaryListItem,
      );
      const result: ApiResponseWithModes<fromModels.CustomerSummaryList> = {
        data: { data },
        modes,
      };
      return result;
    } else {
      const result: ApiResponseWithModes<fromModels.CustomerSummaryList> = {
        modes,
      };
      return result;
    }
  },
);

export function convertCustomerEntityToCustomerSummaryListItem(
  cust: fromCustomers.CustomerEntity,
): fromModels.CustomerSummaryListItem {
  const customer: fromModels.CustomerSummaryListItem = {
    id: cust.id,
    firstName: cust.firstName,
    lastName: cust.lastName,
    company: cust.company,
    fullName: `${cust.firstName} ${cust.lastName}`,
  };
  return customer;
}

// Practice: Create a new selector function that returns a sorted list of all the roles (no duplicates!)
const selectUniqueCustomerRoles = createSelector(
  selectAllCustomerEntityArray,
  (customers) => {
    const roles = new Set<string>();
    customers.forEach((cust) => cust.roles.forEach((role) => roles.add(role)));
    return roles;
  },
);
export const selectSortedUniqueCustomerRoles = createSelector(
  selectUniqueCustomerRoles,
  (roles) => {
    return [...Array.from(roles).sort((lhs, rhs) => lhs.localeCompare(rhs))];
  },
);
