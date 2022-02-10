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
  vaccinationTypes:VaccinationType[]=[];
  selectedPatient:Patient;
  patientObject:Patient=new Patient();
  vaccineObject:Vaccine=new Vaccine();
  hospitalObject:Hospital=new Hospital();

  dobp:string;
  ngOnInit(): void {
     // getting patient info
     this.patientService.getPatients().subscribe(res=>{
      this.patients=res;
    })
    // getting Hospital info
    this.hospitalService.getHospial().subscribe(res=>{
      this.hospitals=res;
    })

    // getting vaccinationTypes info
    this.vaccinationService.getVaccinationType().subscribe(res=>{
      this.vaccinationTypes=res;
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
  get selectedPatientNameValidators(){
    return this.formValue.get('selNameOfPatien');
  }
  get selectDoseValidators(){
    return this.formValue.get('selDose');
  }
  get patientDoaValidators(){
    return this.formValue.get('doa');
  }
  onSelectPatient(selectedPatient:any){
    //  this.patientDob=this.patients.filter(e => e.id==selectedPatient.target.value);
     for(let patient of this.patients){
        if (patient.name===selectedPatient.target.value) {
          this.selectedPatient=patient;
        }
     }
     this.dobp=this.selectedPatient.dob;
    //  console.log(new Date(this.dobp));
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
    this.patientService.updatePatients(this.patientObject,this.selectedPatient.id)
    .subscribe((res)=>{
      alert("Patient Vaccinated SuccessFuly");
      this.ngOnInit();
      this.formValue.reset();
    },
    err=>{alert("Something wrong");
    console.log(err)});
    
    // this.vaccineObject.dose=this.formValue.value.selDose;
    // this.vaccineObject.giveDate=this.formValue.value.doa;
    // this.vaccineObject.brand=this.formValue.value.brandName;
    // this.vaccineObject.patientId=this.selectedPatient.id;

    // this.hospitalObject.name=this.formValue.value.selHospital;
    // this.hospitalObject.patientId=this.selectedPatient.id;

    // console.log(this.vaccineObject);
    // this.patientService.addVaccine(this.vaccineObject)
    // .subscribe((res)=>{
    //   this.patientService.addHospital(this.hospitalObject).subscribe(
    //     (res)=>{
    //       console.log(res);
    //     },
    //     err=>{console.log("Hospital Error")}
    //   )
    // },
    //   err=>console.log("Vaccince error")
    // )
  }
  orderTypeName='ASC';
  orderTypeAge='ASC';

}
