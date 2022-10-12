import { createActionGroup, props } from '@ngrx/store';

export const RoleFilterEvents = createActionGroup({
  source: 'Data Stuff Role Filter Events',
  events: {
    added: props<{ payload: string }>(),
    removed: props<{ payload: string }>(),
  },
});
