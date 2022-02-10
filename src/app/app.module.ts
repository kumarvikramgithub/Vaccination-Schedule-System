import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PatientComponent } from './components/patient/patient.component';
import { VaccinationComponent } from './components/vaccination/vaccination.component';
import { SortPatientNamePipe } from './pipes/sort-patient-name.pipe';
import { SortPatientAgePipe } from './pipes/sort-patient-age.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PatientComponent,
    VaccinationComponent,
    SortPatientNamePipe,
    SortPatientAgePipe,
    AdminComponent
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
