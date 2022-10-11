import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModesDirective } from './loading-modes.directive';
import { AlertComponent } from '@ht/core-ui';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './state';

@NgModule({
  imports: [
    CommonModule,
    AlertComponent,
    StoreModule.forFeature(featureName, reducers),
  ],
  declarations: [LoadingModesDirective],
  exports: [LoadingModesDirective],
})
export class SharedModule {}
