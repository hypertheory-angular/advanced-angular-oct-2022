import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardWithLinkComponent } from './card-with-link/card-with-link.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardWithLinkComponent],
  exports: [CardWithLinkComponent],
})
export class CoreUiModule {}
