import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CustomerEntity } from '../reducers/customers.reducer';

// Actions are of three categories

// Events
// Things that happened. No sense of cause and effect.
// - fireRequested
export const CustomerEvents = createActionGroup({
  source: 'Customer Events',
  events: {
    error: emptyProps(),
    selected: props<{ payload: string }>(),
  },
});
// Commands
// Things that cause something to happen - like "load the customers", or "fire this employee", etc.
// There is an assumed effect from the command being dispatched (loadTheCustomers -> we have some customers!)

export const CustomerCommands = createActionGroup({
  source: 'Customer Commands',
  events: {
    load: emptyProps(),
  },
});
// Documents (Entities)
// are the things that are actually stored in the state.
export const CustomerDocuments = createActionGroup({
  source: 'Customer Documents',
  events: {
    customers: props<{ payload: CustomerEntity[] }>(),
  },
});
