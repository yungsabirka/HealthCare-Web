import { Injectable } from '@angular/core';
import {Appointment} from "../models/appointment.model";
import {environment} from "../../environments/environment";
import {AppointmentRelationship} from "../models/appointmentRelationship.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointmentUrl: string = environment.apiBaseUrl + '/Appointment';
  appointmentRelationshipUrl: string = environment.apiBaseUrl + '/AppointmentRelationship';
  appointment = new Appointment();
  appointmentRelationship = new AppointmentRelationship(0,0,0);
  appointmentList: Appointment[] = [];
  appointmentRelationshipList: AppointmentRelationship[] = [];
  constructor() { }
}
