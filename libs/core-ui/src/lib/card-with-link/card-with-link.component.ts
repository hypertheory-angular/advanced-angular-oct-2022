import { Component, Input } from '@angular/core';

@Component({
  selector: 'ht-ui-card-with-link',
  templateUrl: './card-with-link.component.html',
  styleUrls: ['./card-with-link.component.css'],
})
export class CardWithLinkComponent {
  @Input() title = 'Title';
  @Input() link = '';
  @Input() linkText = 'Link Text';
}
