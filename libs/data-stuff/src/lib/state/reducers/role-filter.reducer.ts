import { createReducer, on } from '@ngrx/store';
import { RoleFilterEvents } from '../actions/role-filter.actions';

export interface RoleFilterState {
  excludedRoles: string[];
}

const initialState: RoleFilterState = {
  excludedRoles: [],
};

export const reducer = createReducer(
  initialState,
  on(RoleFilterEvents.removed, (s, a) => ({
    ...s,
    excludedRoles: s.excludedRoles.filter((r) => r !== a.payload),
  })),
  on(RoleFilterEvents.added, (s, a) => ({
    ...s,
    excludedRoles: [
      a.payload,
      ...s.excludedRoles,
    ],
  })),
);
