import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Medication} from "../../models/medication.model";
import {MedicationService} from "../../services/medication.service";
import {MedicationRelationshipService} from "../../services/medication-relationship.service";
import {RestRequestsService} from "../../services/rest-requests.service";
import {MedicationRelationship} from "../../models/medication-relationship.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-patient-medications',
  templateUrl: './patient-medications.component.html',
  styleUrls: ['./patient-medications.component.css']
})
export class PatientMedicationsComponent implements OnInit {
  currentButtonNumber: number = 1;
  inputValue: string = "";
  step: number = 5;
  buttonsAmount: number = 0;
  medications: Medication[] = [];
  patientMedicationIdList: number[] = [];
  @Input() patientMedicalCardId = 1;
  @Output() medicationsChange: EventEmitter<Medication[]> = new EventEmitter<Medication[]>();
  @Output() patientMedicationIdListChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  constructor(public medicationService: MedicationService,
              public medicationRelationshipService: MedicationRelationshipService,
              private restService: RestRequestsService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.updateMedications();
    this.getPatientMedicationRelationship();
  }

  getPatientMedicationRelationship() {
    try {
      this.restService.get(this.medicationRelationshipService.medicationRelationshipUrl)
        .subscribe(relations => {
          this.medicationRelationshipService.medicationRelationshipList = (relations as MedicationRelationship[])
            .filter(relation => relation.medicalCardId === this.patientMedicalCardId);
          this.setPatientsMedicationsIdList();
        })
    } finally {}
  }
  setPatientsMedicationsIdList(){
    this.medicationRelationshipService.medicationRelationshipList.forEach(relation => {
      this.patientMedicationIdList.push(relation.medicationId)
    })
    this.patientMedicationIdListChange.emit(this.patientMedicationIdList);
  }
  onSubmitMedicationRelationship() {
    const medicationIdToPost = this.patientMedicationIdList.filter(medicationId =>
      !this.medicationRelationshipService.medicationRelationshipList.some(
        relationship => relationship.medicationId === medicationId
      )
    );
    const relationshipIdToDelete = this.medicationRelationshipService.medicationRelationshipList
      .filter(relationship => !this.patientMedicationIdList.includes(relationship.medicationId))
      .map(relationship => relationship.medicationRelationshipId)

    medicationIdToPost.forEach(medicationId => {
      const medicationRelationship = new MedicationRelationship(this.patientMedicalCardId, medicationId);
      this.restService.post(this.medicationRelationshipService.medicationRelationshipUrl,
        medicationRelationship)
        .subscribe();
    });
    relationshipIdToDelete.forEach(relationshipId => {
      this.restService.delete(this.medicationRelationshipService.medicationRelationshipUrl + `/${relationshipId}`)
        .subscribe()
    })
    this.toastrService.success("Medications was added successfully")
    this.patientMedicationIdListChange.emit(this.patientMedicationIdList);
  }

  onSelectedMedications(medicationId: number, medicationDiv: HTMLElement) {
    if (this.patientMedicationIdList.includes(medicationId)) {
      let index = this.patientMedicationIdList.indexOf(medicationId)
      this.patientMedicationIdList.splice(index, 1);
    } else {
      this.patientMedicationIdList.push(medicationId)
    }
  }

  updateMedications() {
    this.medicationService.getMedications()
      .subscribe(result => {
        this.medications = result as Medication[];
        this.buttonsAmount = Math.ceil(this.medications.length / this.step);
        this.medicationsChange.emit(this.medications);
      })
  }

  setCurrentButtonNumber(number: number) {
    this.currentButtonNumber = number;
  }

  getButtonsArray(): number[] {
    return Array.from({length: this.buttonsAmount}, (_, index) => index);
  }
}
