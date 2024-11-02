import {Component, OnInit, Output} from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {DoctorService} from "../../services/doctor.service";
import {MedicationService} from "../../services/medication.service";
import {forkJoin, Observable} from "rxjs";
import {HeaderLink} from "../../models/header-link";
import {UserService} from "../../services/user.service";
import {RestRequestsService} from "../../services/rest-requests.service";

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit{

  doctorsAmount: number = 0;
  medicationsAmount: number = 0;
  usersAmount: number = 0;
  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Log out", "/")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care Admin Page", "/adminMainPage");
  constructor(public userService: UserService,
              public doctorService: DoctorService,
              public medicationService: MedicationService,
              private restService: RestRequestsService) {
  }

  ngOnInit(): void {
    const doctors$ = this.doctorService.getDoctors();
    const medications$ = this.medicationService.getMedications();
    const users$ = this.restService.get(this.userService.userUrl)

    forkJoin([doctors$, medications$, users$])
      .subscribe(result => {
        this.doctorsAmount = Object.values(result[0]).length;
        this.medicationsAmount = Object.values(result[1]).length;
        this.usersAmount = Object.values(result[2]).length;
      })
    }
}
