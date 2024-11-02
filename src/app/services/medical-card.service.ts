import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {MedicalCard} from "../models/medical-card.model";

@Injectable({
  providedIn: 'root'
})
export class MedicalCardService {

  public readonly medicalCardUrl: string = environment.apiBaseUrl + '/MedicalCard';
  public medicalCard: MedicalCard = new MedicalCard();
  constructor() { }
}
