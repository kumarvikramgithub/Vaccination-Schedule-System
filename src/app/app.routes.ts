import { NgModule } from '@angular/core'
import {Router, RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component'
import { AdminComponent } from './components/admin/admin.component'
import { HeaderComponent } from './components/header/header.component'
import { PatientComponent } from './components/patient/patient.component'
import { VaccinationComponent } from './components/vaccination/vaccination.component'
const routes :Routes =[
    // {
    //     path:"",
    //     redirectTo:"counter",
    //     pathMatch:'full'
    // },{
      {
        path :'',
        component : HeaderComponent        // http://localhost:4200/add-a-patient/
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
    }
     
 ]
 @NgModule({
   imports:[RouterModule.forRoot(routes)],
   exports:[RouterModule]
 })
 export class AppRoutingModule{}