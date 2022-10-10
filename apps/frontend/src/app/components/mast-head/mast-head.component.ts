import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ht-mast-head',
  templateUrl: './mast-head.component.html',
  styleUrls: ['./mast-head.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MastHeadComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
