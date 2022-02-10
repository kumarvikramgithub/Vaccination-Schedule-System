import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/model/hospital.model';
import { VaccinationType } from 'src/app/model/vaccinationType.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { VaccinationService } from 'src/app/services/vaccination.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  addHospitalFormValue:FormGroup;
  addVaccinationFormValue:FormGroup;
  hospitals:Hospital[]=[];
  vaccinationTypes:VaccinationType[]=[];


  constructor(
    private fb:FormBuilder,
    private hospitalService:HospitalService,
    private vaccinationService:VaccinationService) { }


  ngOnInit(): void {
    // getting Hospital info
    this.hospitalService.getHospial().subscribe(res=>{
      this.hospitals=res;
    });

    // getting vaccinationTypes info
    this.vaccinationService.getVaccinationType().subscribe(res=>{
      this.vaccinationTypes=res;
    });

    this.addHospitalFormValue=this.fb.group({
      hospitalName:new FormControl('',[Validators.required]),
      hospitalAddress:new FormControl('',[Validators.required])
    });
    
    this.addVaccinationFormValue=this.fb.group({
      vaccinationName:new FormControl('',[Validators.required]),
      aboutVaccination:new FormControl('')
    });

  }
  
  hospital:Hospital=new Hospital();
  vaccinationType:VaccinationType=new VaccinationType();
  onAddHospital(){
   this.hospital.name=this.addHospitalFormValue.value.hospitalName;
   this.hospital.address=this.addHospitalFormValue.value.hospitalAddress;
   this.hospitalService.addHospital(this.hospital).subscribe
   (res=>
    {alert("Hospital Added")
    this.ngOnInit();}
   );
   
  }
  onAddVaccination(){
    this.vaccinationType.type=this.addVaccinationFormValue.value.vaccinationName;
    this.vaccinationType.about=this.addVaccinationFormValue.value.aboutVaccination;
    this.vaccinationService.addVaccinationType(this.vaccinationType).subscribe
    (res=>
     {alert("Vaccination Type Added")
     this.ngOnInit();}
    );
  }
  get vaccinationNameValidators(){
    return this.addVaccinationFormValue.get('vaccinationName');
  }
  get hospitalNameValidators(){
    return this.addHospitalFormValue.get('hospitalName');
  }
  get hospitalAddressValidators(){
    return this.addHospitalFormValue.get('hospitalAddress');
  }
  onReset(FormValue:FormGroup){
    FormValue.reset();
  }
  showAddHospital:boolean=false;
  showAddVaccinationDose:boolean=false;
  showAddHospitalMethod(){
    this.showAddHospital=true;
    this.showAddVaccinationDose=false
    this.onReset(this.addVaccinationFormValue);
  }
  showAddVaccinationDoseMethod(){
    this.showAddHospital=false;
    this.showAddVaccinationDose=true;
    this.onReset(this.addHospitalFormValue);
  }
}
