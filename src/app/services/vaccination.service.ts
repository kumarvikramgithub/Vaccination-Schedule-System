import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { VaccinationType } from '../model/vaccinationType.model';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  
  baseUrl:string='http://localhost:3000/';
  constructor(private http:HttpClient) { }
  addVaccinationType(data:VaccinationType){
    return this.http.post<VaccinationType[]>(`${this.baseUrl}VaccinationType`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getVaccinationType(){
    return this.http.get<VaccinationType[]>(`${this.baseUrl}VaccinationType`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
