import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModesDirective } from './loading-modes.directive';
import { AlertComponent } from '@ht/core-ui';

@NgModule({
  imports: [
    CommonModule,
    AlertComponent,
  ],
  declarations: [LoadingModesDirective],
  exports: [LoadingModesDirective],
})
export class SharedModule {}
