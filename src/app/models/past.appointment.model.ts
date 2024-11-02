import {Appointment} from "./appointment.model";

export class PastAppointment{
  pastAppointmentId: number = 0;
  deletedTime: Date = new Date();
  appointmentId: number = 0;
  startTime: Date = new Date();
  status: string = "Assigned";

  constructor(appointment: Appointment) {
    this.appointmentId = appointment.appointmentId;
    this.startTime = appointment.startTime;
    this.status = appointment.status;
  }
}
