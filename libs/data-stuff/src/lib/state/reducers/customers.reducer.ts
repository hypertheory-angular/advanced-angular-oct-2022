import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { CustomerDocuments } from '../actions/customer.actions';

export interface CustomerEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  address: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomersState extends EntityState<CustomerEntity> {}

export const adapter = createEntityAdapter<CustomerEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(CustomerDocuments.customers, (s, a) => adapter.setAll(a.payload, s)),
);
