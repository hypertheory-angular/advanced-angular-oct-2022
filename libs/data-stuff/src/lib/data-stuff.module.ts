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
import { AlertComponent, CoreUiModule } from '@ht/core-ui';
import { ModesComponent } from './containers/modes/modes.component';
import { SharedModule } from '@ht/shared';
import { DataStuffEffects } from './state/effects/data-stuff.effects';
import { RoleFilterComponent } from './components/role-filter/role-filter.component';
import { CompaniesComponent } from './containers/companies/companies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UniqueCompanyAsyncValidator } from './containers/companies/company-validator';
const routes: Routes = [
  {
    path: '',
    component: DataStuffComponent,
    children: [
      {
        path: 'modes',
        component: ModesComponent,
      },
      {
        path: 'companies',
        component: CompaniesComponent,
      },
      {
        path: 'crm',
        component: CustomersComponent,
        children: [
          {
            path: 'list',
            component: CustomerListComponent,
          },
          {
            // details/8938938938
            path: 'details/:id', // TODO: Add Route Parameter
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
    ReactiveFormsModule,
    AlertComponent,
    SharedModule,
    EffectsModule.forFeature([
      CustomerEffects,
      DataStuffEffects,
    ]),
    HttpClientModule,
    CoreUiModule,
  ],
  declarations: [
    DataStuffComponent,
    CrmComponent,
    CustomersComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    ModesComponent,
    RoleFilterComponent,
    CompaniesComponent,
  ],
  providers: [UniqueCompanyAsyncValidator],
})
export class DataStuffModule {}
