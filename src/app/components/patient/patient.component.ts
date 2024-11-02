import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {Patient} from "../../models/patient.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{
  constructor(public patientService: PatientService,
              private toastr: ToastrService){
  }

  populateForm(selectedPatient: Patient){
    this.patientService.formData = Object.assign({}, selectedPatient);
  }
  onDelete(patientId: number){
    console.log(patientId);
    if(confirm("Are you sure to delete this record?"))
      this.patientService.deletePatient(patientId)
        .subscribe({
          next: result => {
            this.deletePatientFromList(patientId);
            this.toastr.error('Deleted successfully', 'Patient Detail Register')
          },
          error: err => { console.log(err); }
        })
  }
  ngOnInit() {
    this.patientService.refreshList();
  }

  deletePatientFromList(id: number){
    const index = this.patientService.list
      .findIndex(item => item.patientId === id);

    if(index !== -1)
      this.patientService.list.splice(index, 1);
  }
}
