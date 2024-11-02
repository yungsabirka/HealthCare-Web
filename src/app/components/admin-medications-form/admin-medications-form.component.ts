import {Component, Input} from '@angular/core';

import {ToastrService} from "ngx-toastr";

import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {MedicationService} from "../../services/medication.service";
import {AdminMedicationsComponent} from "../admin-medications/admin-medications.component";
import {Medication} from "../../models/medication.model";

@Component({
  selector: 'app-admin-medications-form',
  templateUrl: './admin-medications-form.component.html',
  styleUrls: ['./admin-medications-form.component.css']
})
export class AdminMedicationsFormComponent {
  constructor(public medicationService: MedicationService,
              public medicationComponent: AdminMedicationsComponent,
              private toastr: ToastrService) {
  }

  @Input() currentMedication: Medication = new Medication();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.currentMedication.medicationId == 0 ?
        this.insertRecord(form) : this.updateRecord(form);
    }
    else{
      this.toastr.error(`Form is not valid`);
    }
  }

  insertRecord(form: NgForm) {
    this.successfullyChanged(this.medicationService.postMedication(this.currentMedication),
      form, "Inserted");
  }

  updateRecord(form: NgForm) {
    this.successfullyChanged(this.medicationService.putMedication(this.currentMedication),
      form, "Updated");
  }

  successfullyChanged(request: Observable<Object>, form: NgForm, message: string) {
    request.subscribe({
      next: result => {
        this.medicationComponent.updateMedications();
        form.form.reset();
        this.toastr.success( `${message} successfully`,  `${message} operation`)
        this.currentMedication = new Medication();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onDeleteMedication(form: NgForm) {
    if (form.valid && this.currentMedication.medicationId !== 0) {
      if (confirm("Are you sure to delete this record?"))
        this.successfullyChanged(this.medicationService.deleteMedication(this.currentMedication.medicationId),
          form, "Deleted")
    } else {
      this.toastr.error(`Can not delete`)
    }
  }
}
