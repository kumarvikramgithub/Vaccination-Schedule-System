import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SortPatientNamePipe } from './pipes/sort-patient-name.pipe';
import { SortPatientAgePipe } from './pipes/sort-patient-age.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule,RoutingComponents } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    SortPatientNamePipe,
    SortPatientAgePipe,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
    // RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
