export class AppointmentRelationship{
  appointmentRelationshipId: number = 0;
  appointmentId: number = 0;
  doctorId: number = 0;
  userId: number = 0;

  constructor(appointmentId: number, doctorId: number, userId: number) {
    this.appointmentId = appointmentId;
    this.doctorId = doctorId;
    this.userId = userId;
  }
}
