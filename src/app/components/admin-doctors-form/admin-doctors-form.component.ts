import {Component, Input} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {Patient} from "../../models/patient.model";
import {DoctorService} from "../../services/doctor.service";
import {Doctor} from "../../models/doctor.model";
import {AdminDoctorsComponent} from "../admin-doctors/admin-doctors.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-doctors-form',
  templateUrl: './admin-doctors-form.component.html',
  styleUrls: ['./admin-doctors-form.component.css']
})
export class AdminDoctorsFormComponent {
  constructor(public doctorService: DoctorService,
              public doctorComponent: AdminDoctorsComponent,
              private toastr: ToastrService) {
  }

  @Input() currentDoctor: Doctor = new Doctor();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.currentDoctor.doctorId == 0 ?
        this.insertRecord(form) : this.updateRecord(form);
    }
    else{
      this.toastr.error(`Form is not valid`);
    }
  }

  insertRecord(form: NgForm) {
    this.successfullyChanged(this.doctorService.postDoctor(this.currentDoctor),
      form, "Inserted");
  }

  updateRecord(form: NgForm) {
    this.successfullyChanged(this.doctorService.putDoctor(this.currentDoctor),
      form, "Updated");
  }

  successfullyChanged(request: Observable<Object>, form: NgForm, message: string) {
    request.subscribe({
      next: result => {
        this.doctorComponent.updateDoctors();
        form.form.reset();
        this.toastr.success( `${message} successfully`,  `${message} operation`)
        this.currentDoctor = new Doctor();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onDeleteDoctor(form: NgForm) {
    if (form.valid && this.currentDoctor.doctorId !== 0) {
      if (confirm("Are you sure to delete this record?"))
        this.successfullyChanged(this.doctorService.deleteDoctor(this.currentDoctor.doctorId),
          form, "Deleted")
    } else {
      this.toastr.error(`Can not delete`)
    }
  }
}
