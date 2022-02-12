import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/model/hospital.model';
import { Patient } from 'src/app/model/patient.model';
import { VaccinationType } from 'src/app/model/vaccinationType.model';
import { Vaccine } from 'src/app/model/vaccine.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { PatientService } from 'src/app/services/patient.service';
import { VaccinationService } from 'src/app/services/vaccination.service';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.css']
})
export class VaccinationComponent implements OnInit {

  constructor(private patientService:PatientService,
    private hospitalService:HospitalService,
    private vaccinationService:VaccinationService,
    private formBuilde:FormBuilder) { }

  formValue:FormGroup;
  
  patients:Patient[]=[];
  hospitals:Hospital[]=[];
  vaccines:Vaccine[]=[];
  vaccinationTypes:VaccinationType[]=[];
  selectedPatient:Patient;

  //object of all possible resources
  patientObject:Patient=new Patient();
  vaccineObject:Vaccine=new Vaccine();
  hospitalObject:Hospital=new Hospital();

  dobp:string;
  doseLeft:string[]=[];
  doseCompleted:string[]=[];
  allDoseCompleted:boolean=false;
  //maxDate for disable future date selecion
  maxDate: any=this.getCurrentDate();

  ngOnInit(): void {
    console.log(this.maxDate)
     // getting patient info
     this.patientService.getPatients().subscribe(res=>{
      this.patients=res;
    })
    //
    this.vaccinationService.getVaccine()
    .subscribe((res)=>{
      this.vaccines=res;
    })
    // getting Hospital info
    this.hospitalService.getHospial().subscribe(res=>{
      this.hospitals=res;
    })

    // getting vaccinationTypes info
    this.vaccinationService.getVaccinationType().subscribe(res=>{
      this.vaccinationTypes=res;
    });
    // getting vaccinationTypes info
    this.vaccinationService.getVaccine().subscribe(res=>{
      this.vaccines=res;
    });
    // form building
    this.formValue=this.formBuilde.group({
      selNameOfPatien:new FormControl('',[Validators.required]),
      dob:[''],
      selDose:new FormControl('',[Validators.required]),
      doa:new FormControl('',[Validators.required]),
      brandName:[''],
      selHospital:['']
    })
   
  }
  
  onSelectPatient(selectedPatient:any){
      // after reselecting
      this.allDoseCompleted=false;
      this.doseCompleted=[];
      this.doseLeft=[];
      
     for(let patient of this.patients){
        if (patient.name===selectedPatient.target.value) {
          this.selectedPatient=patient;
        }
     }
     this.dobp=this.selectedPatient.dob;

    for (let vcc of this.vaccines) {
      if (vcc.patientId===this.selectedPatient.id) {
        this.doseCompleted.push(vcc.dose);
      }
    }

    for(let vcc of this.vaccinationTypes){
      if (!this.doseCompleted.includes(vcc.type)) {
        this.doseLeft.push(vcc.type);       
      }
    }
    if(this.doseLeft.length==0){
      this.allDoseCompleted=true;
    }

  }
  onUpdatedPatient(){
    this.patientObject.name=this.formValue.value.selNameOfPatien;
    this.patientObject.dob=this.selectedPatient.dob;
    this.patientObject.dose=this.formValue.value.selDose;
    this.patientObject.giveDate=this.formValue.value.doa;
    this.patientObject.brand=this.formValue.value.brandName;

    //due date caculation
    let doa:Date=new Date(this.formValue.value.doa);
    let dueDate=new Date(doa.setDate((doa.getDate()+20)));
    this.patientObject.dueDate=dueDate;

    this.patientObject.hospitalName=this.formValue.value.selHospital;


    
    // adding new features vaacines
    this.vaccineObject.dose=this.formValue.value.selDose;
    this.vaccineObject.giveDate=this.formValue.value.doa;
    this.vaccineObject.brand=this.formValue.value.brandName;
    this.vaccineObject.dueDate=dueDate;
    this.vaccineObject.givenAt=this.formValue.value.selHospital;
    this.patientObject.vaccine=[this.vaccineObject];
    
    this.vaccineObject.patientId=this.selectedPatient.id;
    // ending vaccines features
   

    

    this.patientService.updatePatients(this.patientObject,this.selectedPatient.id)
    .subscribe((res)=>{
      alert("Patient Vaccinated SuccessFuly");
      this.vaccinationService.addVaccine(this.vaccineObject)
      .subscribe((res)=>{
      })
      // this.ngOnInit();
      // this.formValue.reset();
    },
    err=>{alert("Something wrong");
    console.log(err)});
    

  }
  orderTypeName='ASC';
  orderTypeAge='ASC';
  get selectedPatientNameValidators(){
    return this.formValue.get('selNameOfPatien');
  }
  get selectDoseValidators(){
    return this.formValue.get('selDose');
  }
  get patientDoaValidators(){
    return this.formValue.get('doa');
  }

  //
  getCurrentDate(){
    let date:Date=new Date();

    var day:any=date.getDate();
    if(day<10){
      day="0"+day;
    }


    var month:any=date.getMonth()+1;
    if(month<10){
      month="0"+month;
    }

    var year:any=date.getFullYear();

    let todays:string=year+"-"+month+"-"+day;

    return todays;
  }
}
