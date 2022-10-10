import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCustomers from './reducers/customers.reducer';
export const featureName = 'data-stuff';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DataStuffState {
  customers: fromCustomers.CustomersState;
}

export const reducers: ActionReducerMap<DataStuffState> = {
  customers: fromCustomers.reducer,
};

const selectFeature = createFeatureSelector<DataStuffState>(featureName);
