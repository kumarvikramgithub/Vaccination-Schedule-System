import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../model/patient.model';

@Pipe({
  name: 'sortPatientName'
})
export class SortPatientNamePipe implements PipeTransform {

  transform(patient: Patient[],orderType:string) {
    
    if(orderType==='ASC'){
      return patient.sort((a,b)=>{
        let labelA=a.name;
        let labelB=b.name;
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
        let labelA=a.name;
        let labelB=b.name;
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
