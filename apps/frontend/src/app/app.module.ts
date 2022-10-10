import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MastHeadComponent } from './components/mast-head/mast-head.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    MastHeadComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  // note here
}
