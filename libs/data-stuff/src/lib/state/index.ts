import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromCustomers from './reducers/customers.reducer';
import * as fromModels from '../models';
import * as fromRoleFilters from './reducers/role-filter.reducer';
import { LoadingModes, selectUrl } from '@ht/shared';
export const featureName = 'data-stuff';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DataStuffState {
  customers: fromCustomers.CustomersState;
  roleFilters: fromRoleFilters.RoleFilterState;
}

export const reducers: ActionReducerMap<DataStuffState> = {
  customers: fromCustomers.reducer,
  roleFilters: fromRoleFilters.reducer,
};

// 1. Feature Selector
const selectFeature = createFeatureSelector<DataStuffState>(featureName);

// 2. A Selector Per Branch of the Feature

const selectCustomersBranch = createSelector(selectFeature, (f) => f.customers);
const selectRoleFilterBranch = createSelector(
  selectFeature,
  (f) => f.roleFilters,
);

// 3. Helpers (optional)

export const selectRoleFiltersExcludedRoles = createSelector(
  selectRoleFilterBranch,
  (b) => b.excludedRoles,
);
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

const selectUniqueCustomerRoles = createSelector(
  selectAllCustomerEntityArray,
  (customers) => {
    const roles = new Set<string>();
    customers.forEach((cust) => cust.roles.forEach((role) => roles.add(role)));
    return Array.from(roles);
  },
);
export const selectSortedUniqueCustomerRoles = createSelector(
  selectUniqueCustomerRoles,
  (roles) => {
    return [...roles.sort((lhs, rhs) => lhs.localeCompare(rhs))];
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

const selectFilteredCustomerEntityArray = createSelector(
  selectAllCustomerEntityArray,
  selectRoleFiltersExcludedRoles,
  (customers, excludedRoles) => {
    const results: fromCustomers.CustomerEntity[] = [];

    customers.forEach((cust) => {
      if (cust.roles.some((x) => excludedRoles.indexOf(x) > 0)) {
        // skip
      } else {
        results.push(cust);
      }
    });

    return results;
  },
);

export const selectCustomerListModel = createSelector(
  selectFilteredCustomerEntityArray,
  selectCustomerLoadingInformation,
  selectSortedUniqueCustomerRoles,
  (customers, loadModes, roles) => {
    const modes: LoadingModes = {
      ...loadModes,
      empty: !customers,
    };
    if (customers) {
      const data: fromModels.CustomerSummaryListItem[] = customers.map(
        convertCustomerEntityToCustomerSummaryListItem,
      );
      const result: ApiResponseWithModes<fromModels.CustomerSummaryList> = {
        data: { data, roles },
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
