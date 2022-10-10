import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreUiModule } from '@ht/core-ui';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreUiModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
