import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, Output} from '@angular/core';
import {HeaderLink} from "../../models/header-link";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AppointmentService} from "../../services/appointment.service";
import {DoctorService} from "../../services/doctor.service";
import {RestRequestsService} from "../../services/rest-requests.service";
import {AppointmentRelationship} from "../../models/appointmentRelationship.model";
import {Appointment} from "../../models/appointment.model";
import {Doctor} from "../../models/doctor.model";

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent {
  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Profile", "/userProfile"),
    new HeaderLink("Medical Record", "/userMedicalCard"),
    new HeaderLink("Appointments", `/userAppointments/${this.userService.user.userId}`),
    new HeaderLink("Log out", "")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care", "/userMainPage");

  readonly noAppointmentMessage: string = "You don't have any appointment";
  readonly title: string = "Your Appointments"
  constructor(public userService: UserService) {
  }



}
