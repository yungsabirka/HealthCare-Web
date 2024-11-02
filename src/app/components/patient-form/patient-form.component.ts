import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {NgForm} from "@angular/forms"
import {Patient} from "../../models/patient.model";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent{
  constructor(public patientService: PatientService,
              private toastr: ToastrService){}

  onSubmit(form: NgForm) {
    if(form.valid){
      if(this.patientService.formData.patientId == 0){
        this.insertRecord(form);
      }
      else{
        this.updateRecord(form);
      }
    }
  }

  insertRecord(form: NgForm){
    this.patientService.postPatient()
      .subscribe({
        next: result => {
          this.patientService.list.push(result as Patient);
          this.patientService.resetForm(form);
          this.toastr.success('Inserted successfully', 'Patient Detail Register')
        },
        error: err => { console.log(err); }
      })
  }
  updateRecord(form: NgForm){
    this.patientService.putPatient()
      .subscribe({
        next: result => {
          this.patientService.refreshList();
          this.patientService.resetForm(form);
          this.toastr.info('Updated successfully', 'Patient Detail Register')
        },
        error: err => { console.log(err); }
      })
  }
}
