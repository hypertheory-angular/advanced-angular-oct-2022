import { ChangeDetectionStrategy, Component } from '@angular/core';
import { selectUrl } from '@ht/shared';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ht-mast-head',
  templateUrl: './mast-head.component.html',
  styleUrls: ['./mast-head.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MastHeadComponent {
  url$ = this.store.select(selectUrl);
  constructor(private store: Store) {}
}
