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
  on(RoleFilterEvents.toggle, (s, a) => {
    if (s.excludedRoles.some((r) => r === a.payload)) {
      // it's there
      return {
        ...s,
        excludedRoles: s.excludedRoles.filter((r) => r !== a.payload),
      };
    } else {
      return {
        ...s,
        excludedRoles: [
          a.payload,
          ...s.excludedRoles,
        ],
      };
    }
  }),
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
