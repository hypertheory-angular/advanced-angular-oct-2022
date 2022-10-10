import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AlertComponent, CoreUiModule } from '@ht/core-ui';
import { OverviewComponent } from './components/overview/overview.component';
import { ResourcesComponent } from './components/resources/resources.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    CoreUiModule,
    RouterModule.forChild(routes),
    AlertComponent,
  ],
  declarations: [
    DashboardComponent,
    OverviewComponent,
    ResourcesComponent,
  ],
})
export class DashboardModule {}
