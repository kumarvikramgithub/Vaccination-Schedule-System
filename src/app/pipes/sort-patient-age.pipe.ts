import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../model/patient.model';

@Pipe({
  name: 'sortPatientAge'
})
export class SortPatientAgePipe implements PipeTransform {

  transform(patient: Patient[],orderType:string) {
    // console.log('age clock');
    if(orderType==='ASC'){
      return patient.sort((a,b)=>{
        let labelA=new Date(a.dob);
        let labelB=new Date(b.dob);
        // console.log(labelA,labelB);
        if(labelA>labelB){
          return 1
        }else if(labelB>labelA){
          return -1;
        }else{
          return 0
        }
      })
    }else{
      return patient.sort((b,a)=>{
        let labelA=new Date(a.dob);
        let labelB=new Date(b.dob);
        // console.log(labelA,labelB);
        if(labelA>labelB){
          return 1
        }else if(labelB>labelA){
          return -1;
        }else{
          return 0
        }
      })
    }
  }

}
