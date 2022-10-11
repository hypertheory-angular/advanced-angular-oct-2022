import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataStuffComponent } from './data-stuff.component';
import { RouterModule, Routes } from '@angular/router';
import { CrmComponent } from './components/crm/crm.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './state';
import { HttpClientModule } from '@angular/common/http';
import { CustomerEffects } from './state/effects/customer.effects';
import { EffectsModule } from '@ngrx/effects';
import { CustomersComponent } from './containers/customers/customers.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { AlertComponent } from '@ht/core-ui';
const routes: Routes = [
  {
    path: '',
    component: DataStuffComponent,
    children: [
      {
        path: 'crm',
        component: CustomersComponent,
        children: [
          {
            path: 'list',
            component: CustomerListComponent,
          },
          {
            path: 'details', // TODO: Add Route Parameter
            component: CustomerDetailsComponent,
          },
          {
            path: '**', // If they don't specify, this is a 'catchall'
            redirectTo: 'list',
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    AlertComponent,
    EffectsModule.forFeature([CustomerEffects]),
    HttpClientModule,
  ],
  declarations: [
    DataStuffComponent,
    CrmComponent,
    CustomersComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
  ],
})
export class DataStuffModule {}
