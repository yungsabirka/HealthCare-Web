import { Injectable } from '@angular/core';
import {MedicationRelationship} from "../models/medication-relationship.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MedicationRelationshipService {

  public medicationRelationship: MedicationRelationship = new MedicationRelationship();
  public medicationRelationshipList: MedicationRelationship[] = [];
  public readonly medicationRelationshipUrl: string = environment.apiBaseUrl + "/MedicationRelationship"
  constructor() { }
}
