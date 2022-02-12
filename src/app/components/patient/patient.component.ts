import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  formValue: FormGroup;
  patientObject: Patient = new Patient();
  uniquePaientNameMessage: string = "";
  patients: Patient[] = [];
  showMessagePatientDuplicate: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(
      (res) => {
        this.patients = res;
      }
    )
    this.formValue = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      selgender: [''],
      birthPlace: [''],
      selblood: [''],
      height: [''],
      weight: ['']

    })
  }
  onCancel(){
    this.router.navigate(['']);
  }
  get patientNameValidators() {
    return this.formValue.get('name');
  }
  get patientDobValidators() {
    return this.formValue.get('dob');
  }
  onAddPatient() {

    // this.patientObject.vaccine=[];
    // this.patientObject.hospital=[];
    // console.log(this.patientObject);

    for (let patient of this.patients) {
      if (patient.name == this.formValue.value.name) {
        this.uniquePaientNameMessage += patient.name.toUpperCase() + " is already available, Please enter Unique Patient name";
        this.showMessagePatientDuplicate = true;
        break;
      } else {

        this.uniquePaientNameMessage = "";
      }
    }
    if (this.uniquePaientNameMessage == "") {
      this.patientObject.name = this.formValue.value.name;
      this.patientObject.dob = this.formValue.value.dob;
      this.patientObject.gender = this.formValue.value.selgender;
      this.patientObject.placeOfBirth = this.formValue.value.birthPlace;
      this.patientObject.bloodGroup = this.formValue.value.selblood;
      this.patientObject.height = this.formValue.value.height;
      this.patientObject.weight = this.formValue.value.weight;
      this.patientObject.vaccine=[];
      this.patientService.addPatients(this.patientObject)
        .subscribe(res => {
          // console.log(res);
          alert("Patient’s details have been saved successfully");
          this.formValue.reset();

        },
          err => {
            alert("something went Wrong");
          });
      this.router.navigate(['']);
    }
  }

}
