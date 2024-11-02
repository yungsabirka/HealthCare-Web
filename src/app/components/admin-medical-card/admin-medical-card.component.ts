import {Component, Input, OnInit, Output} from '@angular/core';
import {HeaderLink} from "../../models/header-link";
import {UserService} from "../../services/user.service";
import {RestRequestsService} from "../../services/rest-requests.service";
import {MedicalCardService} from "../../services/medical-card.service";
import {MedicalCard} from "../../models/medical-card.model";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {map, of, switchMap} from "rxjs";
import {MedicationService} from "../../services/medication.service";
import {Medication} from "../../models/medication.model";

@Component({
  selector: 'app-admin-medical-card',
  templateUrl: './admin-medical-card.component.html',
  styleUrls: ['./admin-medical-card.component.css']
})
export class AdminMedicalCardComponent implements OnInit {
  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Log out", "/")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care Admin Page", "/adminMainPage");

  userId: number = 0;
  currentPatient: User = new User();
  userMedicalCard = new MedicalCard();
  noAppointmentMessage = "This patients doesn't have appointments soon"
  title: string = "Patient appointments"
  patientMedicationIdList: number[] = [];
  medications: Medication[] = [];

  constructor(public userService: UserService,
              public restService: RestRequestsService,
              public medicalCardService: MedicalCardService,
              private route: ActivatedRoute,
              private toastsr: ToastrService) {
  }

  ngOnInit() {
    this.medicalCardService.medicalCard = new MedicalCard();
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.getUserAndMedicalCard();
    })
  }

  onMedicationsChange(newMedications: Medication[]): void {
    this.medications = newMedications;
  }
  onPatientMedicationIdListChange(newList: number[]){
    this.patientMedicationIdList = newList;
  }
  getMedicationById = (medicationId: number) =>
    this.medications.find(medication => medication.medicationId === medicationId)?.medicationName;

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.currentPatient.medicalCardId === 1) {
        this.restService.get(this.medicalCardService.medicalCardUrl)
          .subscribe(medicalCards => {
            const maxMedicalCardId = (medicalCards as MedicalCard[])
              .reduce((maxId, card) => Math.max(maxId, card.medicalCardId), 0);

            this.medicalCardService.medicalCard.medicalCardId = maxMedicalCardId + 1;
          })
        this.restService.post(this.medicalCardService.medicalCardUrl, this.medicalCardService.medicalCard)
          .subscribe(() => {
            this.toastsr.success("Medical Card was added successfully")
            this.userMedicalCard = Object.assign({}, this.medicalCardService.medicalCard);
            this.currentPatient.medicalCardId = this.userMedicalCard.medicalCardId;
            this.restService.put(this.userService.userUrl + `/${this.currentPatient.userId}`, this.currentPatient)
              .subscribe()
          })
      } else {
        this.restService.put(this.medicalCardService.medicalCardUrl + `/${this.medicalCardService.medicalCard.medicalCardId}`,
          this.medicalCardService.medicalCard)
          .subscribe(() => {
            this.toastsr.success("Medical Card was changed successfully")
            this.userMedicalCard = Object.assign({}, this.medicalCardService.medicalCard);
          })
      }
    }
  }

  calculateUserAge(dateOfBirth: Date): number {
    const currentTime = Date.now();
    const birthTime = new Date(dateOfBirth).getTime();

    const timeDifference = currentTime - birthTime;

    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;

    return Math.floor(timeDifference / millisecondsPerYear);
  }

  getUser() {
    return this.restService.get(this.userService.userUrl + `/${this.userId}`)
      .pipe(
        map(result => this.currentPatient = result as User)
      );
  }

  getMedicalCard() {
    return this.restService.get(this.medicalCardService.medicalCardUrl + `/${this.currentPatient.medicalCardId}`)
      .pipe(
        map(result => {
          if (result) {
            this.medicalCardService.medicalCard = result as MedicalCard;
            this.userMedicalCard = Object.assign({}, this.medicalCardService.medicalCard);
          }
        })
      );
  }

  getUserAndMedicalCard() {
    this.getUser()
      .pipe(
        switchMap(() => {
          if (this.currentPatient && this.currentPatient.medicalCardId !== 1) {
            return this.getMedicalCard();
          } else {
            return of(null);
          }
        })
      )
      .subscribe();
  }
}
