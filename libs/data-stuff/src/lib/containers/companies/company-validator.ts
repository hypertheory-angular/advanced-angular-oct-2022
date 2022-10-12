import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, Observable, of, tap } from 'rxjs';
import { doesCompanyExist } from '../../state';

@Injectable()
export class UniqueCompanyAsyncValidator implements AsyncValidator {
  constructor(private readonly store: Store) {}

  validate(
    control: AbstractControl<any, any>,
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const value = control.value as string;
    if (!value) return of(null);
    return this.store.select(doesCompanyExist(value)).pipe(
      debounceTime(1000),
      filter((r) => r === true),
      map(() => ({ companyExists: true })),
    );
  }
  registerOnValidatorChange?(fn: () => void): void {
    // nothing.
  }
}
