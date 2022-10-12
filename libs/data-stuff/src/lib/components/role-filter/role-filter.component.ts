import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRoleFiltersExcludedRoles } from '../../state';
import { RoleFilterEvents } from '../../state/actions/role-filter.actions';

@Component({
  selector: 'ht-role-filter',
  templateUrl: './role-filter.component.html',
  styleUrls: ['./role-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RoleFilterComponent {
  @Input() roles: string[] = [];
  excluded$ = this.store.select(selectRoleFiltersExcludedRoles);

  getIsExcluded(role: string, excluded: string[]) {
    // This is a bit sus.
    return excluded.some((x) => x === role);
  }
  constructor(private readonly store: Store) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleRole(role: string) {
    this.store.dispatch(RoleFilterEvents.toggle({ payload: role }));
  }
}
