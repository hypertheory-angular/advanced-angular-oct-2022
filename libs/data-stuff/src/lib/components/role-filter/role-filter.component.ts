import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { RoleFilterEvents } from '../../state/actions/role-filter.actions';

@Component({
  selector: 'ht-role-filter',
  templateUrl: './role-filter.component.html',
  styleUrls: ['./role-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RoleFilterComponent implements OnInit {
  @Input() roles: string[] = [];

  roleObj: RoleMember[] = [];

  constructor(private readonly store: Store) {}
  ngOnInit(): void {
    this.roleObj = this.roles.map((r) => ({ name: r, checked: true }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleRole(event: any, role: RoleMember) {
    if (!role.checked) {
      this.store.dispatch(RoleFilterEvents.removed({ payload: role.name }));
    } else {
      this.store.dispatch(RoleFilterEvents.added({ payload: role.name }));
    }
    role.checked = !role.checked;

    //event.preventDefault();
  }
}

type RoleMember = { name: string; checked: boolean };
