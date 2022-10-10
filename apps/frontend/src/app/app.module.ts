import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MastHeadComponent } from './components/mast-head/mast-head.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreUiModule } from '@ht/core-ui';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@ht/dashboard').then((m) => m.DashboardModule),
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
    CoreUiModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  // note here
}
