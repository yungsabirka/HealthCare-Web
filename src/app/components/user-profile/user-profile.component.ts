import {Component, Output} from '@angular/core';
import {HeaderLink} from "../../models/header-link";
import {UserService} from "../../services/user.service";
import {DoctorService} from "../../services/doctor.service";
import {Doctor} from "../../models/doctor.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Profile", "/userProfile"),
    new HeaderLink("Medical Record", "/userMedicalCard"),
    new HeaderLink("Appointments", `/userAppointments/${this.userService.user.userId}`),
    new HeaderLink("Log out", "")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care", "/userMainPage");

  constructor(public userService: UserService) {
  }



}
