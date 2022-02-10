import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { Patient } from '../model/patient.model';
import {HttpClient} from '@angular/common/http'
import { Vaccine } from '../model/vaccine.model';
import { Hospital } from '../model/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl:string='http://localhost:3000/';

  constructor(private http: HttpClient) { }
  addPatients(data:Patient){
    return this.http.post<Patient[]>(`${this.baseUrl}Patients`,data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  addVaccine(data:Vaccine){
    return this.http.post<Vaccine[]>(`${this.baseUrl}Vaccines`,data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  addHospital(data:Hospital){
    return this.http.post<Hospital[]>(`${this.baseUrl}Hospitals`,data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  getPatients(){
    return this.http.get<Patient[]>(`${this.baseUrl}Patients`)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  updatePatients(data:Patient,id:number){
    return this.http.put<Patient[]>(`${this.baseUrl}patients/`+id,data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  deletePatients(id:number){
    return this.http.delete<any>(`${this.baseUrl}patients`+id)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  
}
