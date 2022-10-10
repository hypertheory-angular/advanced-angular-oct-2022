import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ht-ui-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() alertStyle: 'info' | 'warning' | 'success' | 'error' = 'info';
}
