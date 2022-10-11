// id, firstname, lastname, company

import { CustomerEntity } from '../state/reducers/customers.reducer';

export type CustomerSummaryListItem = Pick<
  CustomerEntity,
  'id' | 'firstName' | 'lastName' | 'company'
> & { fullName: string };

export type CustomerSummaryList = {
  data: CustomerSummaryListItem[];
};

export type CustomerDetailsItem = CustomerEntity;
