export class MedicationRelationship{
  medicationRelationshipId: number = 0;
  medicalCardId: number = 0;
  medicationId: number = 0;

  constructor(medicalCardId: number = 0, medicationId: number = 0) {
    this.medicalCardId = medicalCardId;
    this.medicationId = medicationId;
  }
}
