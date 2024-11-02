import {Component, Input, OnInit} from '@angular/core';
import {Doctor} from "../../models/doctor.model";
import {Appointment} from "../../models/appointment.model";
import {UserService} from "../../services/user.service";
import {AppointmentService} from "../../services/appointment.service";
import {DoctorService} from "../../services/doctor.service";
import {RestRequestsService} from "../../services/rest-requests.service";
import {AppointmentRelationship} from "../../models/appointmentRelationship.model";
import {User} from "../../models/user.model";
import {map, Observable} from "rxjs";
import {PastAppointmentService} from "../../services/past-appointment.service";
import {PastAppointment} from "../../models/past.appointment.model";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  doctorAppointmentMap: Map<Doctor, Appointment> = new Map<Doctor, Appointment>();

  @Input() currentUser: User = new User();
  @Input() userObservable: Observable<User> = new Observable<User>();
  appointmentRelationshipList: AppointmentRelationship[] = []
  @Input() noAppointmentMessage: string = ""
  @Input() title: string = "";

  currentButtonNumber: number = 1;
  inputValue: string = "";
  step: number = 3;
  buttonsAmount: number = 0;

  constructor(public userService: UserService,
              public appointmentService: AppointmentService,
              public doctorService: DoctorService,
              private restService: RestRequestsService,
              private pastAppointmentService: PastAppointmentService) {
  }

  ngOnInit() {
    if (this.currentUser.userId === 0) {
      this.userObservable.subscribe(result => this.currentUser = result)
    }
    this.getUserAppointments();
  }

  getDate = (date: Date | undefined) =>
    date ? date.toString().split('T')[0] : "No date"
  getTime = (date: Date | undefined) =>
    date ? date.toString().split('T')[1].slice(0, 5) : "No time"

  getDoctorAppointmentKeys = () =>
    [...this.doctorAppointmentMap.keys()];


  getUserAppointments() {
    this.restService.get(this.appointmentService.appointmentRelationshipUrl)
      .subscribe(result => {
        this.appointmentRelationshipList = (result as AppointmentRelationship[])
          .filter(relation => relation.userId === this.currentUser.userId)

        this.buttonsAmount = Math.ceil(this.appointmentRelationshipList.length / this.step);
        this.appointmentRelationshipList.forEach(relation => {
          this.restService.get(this.doctorService.doctorUrl + `/${relation.doctorId}`)
            .subscribe(doctorResult => {
              this.restService.get(this.appointmentService.appointmentUrl + `/${relation.appointmentId}`)
                .subscribe(appointmentResult => {
                  if(this.checkDate(appointmentResult as Appointment)){
                    this.doctorAppointmentMap.set(doctorResult as Doctor, appointmentResult as Appointment);
                  } else{
                    this.deleteAppointment(appointmentResult as Appointment);
                  }
                })
            })
        })
      })
  }

  checkDate = (appointment: Appointment) =>
    new Date() < new Date(appointment.startTime);

  onDeleteAppointment(appointment: Appointment){
    if(confirm("Are you sure you want to delete this appointment&")){
      this.deleteAppointment(appointment);
      for(const [mapDoctor, mapAppointment] of this.doctorAppointmentMap.entries()){
        if(mapAppointment.appointmentId === appointment.appointmentId){
          this.doctorAppointmentMap.delete(mapDoctor);
          break;
        }
      }
    }
  }

  deleteAppointment(appointment: Appointment){
    this.restService.post(this.pastAppointmentService.pastAppointmentUrl, new PastAppointment(appointment))
      .subscribe();
    this.restService.delete(this.appointmentService.appointmentUrl + `/${appointment.appointmentId}`)
      .subscribe();

    const relationshipIdToDelete = this.appointmentRelationshipList
      .find(relationship => relationship.appointmentId === appointment.appointmentId)
      ?.appointmentRelationshipId;

    if (relationshipIdToDelete !== undefined) {
      const indexToDelete = this.appointmentRelationshipList.findIndex(relationship => relationship.appointmentRelationshipId === relationshipIdToDelete);

      if (indexToDelete !== -1) {
        this.appointmentRelationshipList.splice(indexToDelete, 1);
        this.restService.delete(this.appointmentService.appointmentRelationshipUrl + `/${relationshipIdToDelete}`)
          .subscribe();
      }
    }
  }
  setCurrentButtonNumber(number: number){
    this.currentButtonNumber = number;
  }
  getButtonsArray(): number[] {
    return Array.from({ length: this.buttonsAmount }, (_, index) => index);
  }
}
