import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MastHeadComponent } from './components/mast-head/mast-head.component';
import { RouterModule, Routes } from '@angular/router';
import { AlertComponent } from '@ht/core-ui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@ht/shared';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@ht/dashboard').then((m) => m.DashboardModule),
  },
  {
    path: 'data',
    loadChildren: () => import('@ht/data-stuff').then((m) => m.DataStuffModule),
  },
];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    MastHeadComponent,
  ],
  imports: [
    BrowserModule,
    AlertComponent,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SharedModule,
    // TODO: FIX THIS TOMORROW
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  // note here
}
