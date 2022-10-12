import { createActionGroup, props } from '@ngrx/store';

export const OnboardingEvents = createActionGroup({
  source: 'Onboarding Events',
  events: {
    requested: props<{ payload: OnboardingRequest }>(),
  },
});

export type OnboardingRequest = {
  name: string;
  email: string;
  company: string;
  age: number;
};
