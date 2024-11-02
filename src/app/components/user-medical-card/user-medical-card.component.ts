import {Component, OnInit, Output} from '@angular/core';
import {HeaderLink} from "../../models/header-link";
import {UserService} from "../../services/user.service";
import {MedicalCardService} from "../../services/medical-card.service";
import {RestRequestsService} from "../../services/rest-requests.service";
import {MedicalCard} from "../../models/medical-card.model";
import {MedicationRelationship} from "../../models/medication-relationship.model";
import {MedicationRelationshipService} from "../../services/medication-relationship.service";
import {Medication} from "../../models/medication.model";
import {MedicationService} from "../../services/medication.service";

@Component({
  selector: 'app-user-medical-card',
  templateUrl: './user-medical-card.component.html',
  styleUrls: ['./user-medical-card.component.css']
})
export class UserMedicalCardComponent implements OnInit{
  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Profile", "/userProfile"),
    new HeaderLink("Medical Record", "/userMedicalCard"),
    new HeaderLink("Appointments", `/userAppointments/${this.userService.user.userId}`),
    new HeaderLink("Log out", "")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care", "/userMainPage");

  patientMedicationIdList: number[] = [];
  medications: Medication[] = [];
  constructor(public userService: UserService,
              public medicalCardService: MedicalCardService,
              public medicationService: MedicationService,
              public restService: RestRequestsService,
              public medicationRelationshipService: MedicationRelationshipService) {
  }

  ngOnInit(){
    this.getMedicalCard();
    this.getPatientMedicationRelationship();
    this.getMedications();
  }
  getMedicalCard(){
    this.restService.get(this.medicalCardService.medicalCardUrl + `/${this.userService.user.userId}`)
      .subscribe(medicalCard => {
        this.medicalCardService.medicalCard = medicalCard as MedicalCard;
      })
  }

  getMedications(){
    this.restService.get(this.medicationService.medicationUrl)
      .subscribe(medications => this.medications = medications as Medication[]);
  }
  getMedicationById = (medicationId: number) =>
    this.medications.find(medication => medication.medicationId === medicationId)?.medicationName;

  getPatientMedicationRelationship() {
    try {
      this.restService.get(this.medicationRelationshipService.medicationRelationshipUrl)
        .subscribe(relations => {
          this.medicationRelationshipService.medicationRelationshipList = (relations as MedicationRelationship[])
            .filter(relation => relation.medicalCardId === this.userService.user.medicalCardId);
          this.setPatientsMedicationsIdList();
        })
    } finally {}
  }
  calculateUserAge(dateOfBirth: Date): number {
    const currentTime = Date.now();
    const birthTime = new Date(dateOfBirth).getTime();

    const timeDifference = currentTime - birthTime;

    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;

    return Math.floor(timeDifference / millisecondsPerYear);
  }

  setPatientsMedicationsIdList(){
    this.medicationRelationshipService.medicationRelationshipList.forEach(relation => {
      this.patientMedicationIdList.push(relation.medicationId)
    })
  }
}
