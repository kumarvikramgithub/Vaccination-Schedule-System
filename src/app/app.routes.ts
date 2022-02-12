import { NgModule } from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component'
import { AdminComponent } from './components/admin/admin.component'
import { HomeComponent } from './components/home/home.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { PatientComponent } from './components/patient/patient.component'
import { VaccinationComponent } from './components/vaccination/vaccination.component'
const routes :Routes =[
      {
        path :'',
        component : HomeComponent        // http://localhost:4200/
      },
        {
        path : 'add-a-patient',
        component : PatientComponent        // http://localhost:4200/add-a-patient/
      },
    {
        path : 'administer-Vaccinations',              // http://localhost:4200/administer-Vaccinations/
        component : VaccinationComponent
    },
    {
      path : 'application-admin',              // http://localhost:4200/login/application-admin/
      component : AdminComponent
    },
    {
      path : '**',              // http://localhost:4200/login/application-admin/
      component : PageNotFoundComponent
    }
     
 ]
 @NgModule({
   imports:[RouterModule.forRoot(routes)],
   exports:[RouterModule]
 })
 export class AppRoutingModule{}
 export const RoutingComponents=[HomeComponent,PatientComponent,VaccinationComponent,AdminComponent,PageNotFoundComponent];