import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Hospital } from '../model/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  baseUrl:string='http://localhost:3000/';
  constructor(private http:HttpClient) { }

  addHospital(data:Hospital){
    return this.http.post<Hospital[]>(`${this.baseUrl}Hospitals`,data).pipe
    (map((res:any)=>{
      return res
    }));
  }
  getHospial(){
    return this.http.get<Hospital[]>(`${this.baseUrl}Hospitals`).pipe
    (map((res:any)=>{
      return res
    }));
  }
}
