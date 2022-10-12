import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  OnboardingEvents,
  OnboardingRequest,
} from '../../state/actions/onboarding-actions';
import { UniqueCompanyAsyncValidator } from './company-validator';

@Component({
  selector: 'ht-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent {
  form = new FormGroup<StronglyTypedForm<OnboardingRequest>>({
    name: new FormControl<string>('', { nonNullable: true }),
    company: new FormControl<string>('', {
      nonNullable: true,
      asyncValidators: [this.companyValidator.validate],
    }),
    email: new FormControl<string>('', { nonNullable: true }),
    age: new FormControl<number>(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(13),
      ],
    }),
  });
  constructor(
    private readonly store: Store,
    private readonly companyValidator: UniqueCompanyAsyncValidator,
  ) {}

  done() {
    console.log(this.form.value);
    if (this.form.valid) {
      const payload = this.form.value as OnboardingRequest;
      this.store.dispatch(OnboardingEvents.requested({ payload }));
    } else {
      console.log(this.form.controls.company.errors);
    }
  }
}

type StronglyTypedForm<Type> = {
  [Property in keyof Type]: FormControl<Type[Property]>;
};
