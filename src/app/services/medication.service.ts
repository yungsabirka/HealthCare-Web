import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Medication} from "../models/medication.model";

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  public readonly medicationUrl: string = environment.apiBaseUrl + '/Medication'
  public medication: Medication = new Medication();
  constructor(private http: HttpClient) {}

  getMedications(){
    return this.http.get(this.medicationUrl);
  }

  postMedication(medication: Medication){
    return this.http.post(this.medicationUrl, medication);
  }

  putMedication = (medication: Medication) =>
    this.http.put(this.medicationUrl + '/' + medication.medicationId, medication)

  deleteMedication(medicationId: number){
    return this.http.delete(this.medicationUrl + '/' + medicationId);
  }

}
