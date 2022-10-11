// id, firstname, lastname, company

import { CustomerEntity } from '../state/reducers/customers.reducer';

export type CustomerSummaryListItem = Pick<
  CustomerEntity,
  'id' | 'firstName' | 'lastName' | 'company'
>;

export type CustomerSummaryList = {
  data: CustomerSummaryListItem[];
};
