import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {PastAppointment} from "../models/past.appointment.model";

@Injectable({
  providedIn: 'root'
})
export class PastAppointmentService {

  public readonly pastAppointmentUrl = environment.apiBaseUrl + '/PastAppointment'
  constructor() { }
}
