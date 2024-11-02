import {Component, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {HeaderLink} from "../../models/header-link";
import {DoctorService} from "../../services/doctor.service";
import {Doctor} from "../../models/doctor.model";
import {RestRequestsService} from "../../services/rest-requests.service";
import {AppointmentService} from "../../services/appointment.service";
import {NgForm} from "@angular/forms";
import {AppointmentRelationship} from "../../models/appointmentRelationship.model";
import {ToastrService} from "ngx-toastr";
import {Appointment} from "../../models/appointment.model";

@Component({
  selector: 'app-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.css']
})
export class UserMainPageComponent implements OnInit {

  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Profile", "/userProfile"),
    new HeaderLink("Medical Record", "/userMedicalCard"),
    new HeaderLink("Appointments", `/userAppointments/${this.userService.user.userId}`),
    new HeaderLink("Log out", "")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care", "/userMainPage");

  doctors: Doctor[] = [];
  currentButtonNumber: number = 1;
  inputValue: string = "";
  step: number = 5;
  buttonsAmount: number = 0;
  isDoctorSelected: boolean = false;
  availableTimes: string[] = [];
  selectedDate: string = "";
  selectedTime: string = "";

  constructor(public userService: UserService,
              public doctorService: DoctorService,
              private restService: RestRequestsService,
              public appointmentService: AppointmentService,
              public toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.updateDoctors();
  }

  onSetCurrentDoctor(doctor: Doctor, cardDiv: HTMLElement) {
    this.removeGreenBorder();
    if (!this.isDoctorSelected) {
      cardDiv.classList.add('green-border');
      this.doctorService.currentDoctor = Object.assign({}, doctor);
    } else {
      cardDiv.classList.remove('green-border');
    }
    this.isDoctorSelected = !this.isDoctorSelected;
  }

  removeGreenBorder() {
    let cardDivs = document.querySelectorAll(".doctor-card-container")
    cardDivs.forEach(card => {
      card.classList.remove('green-border')
    })
  }

  updateDoctors() {
    this.doctorService.getDoctors()
      .subscribe(result => {
        this.doctors = result as Doctor[];
        this.buttonsAmount = Math.ceil(this.doctors.length / this.step);
      })
  }

  setCurrentButtonNumber(number: number) {
    this.currentButtonNumber = number;
  }

  getButtonsArray(): number[] {
    return Array.from({length: this.buttonsAmount}, (_, index) => index);
  }


  minDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  generateAvailableTimes(): void {
    const startHour = 10;
    const endHour = 19;
    let doctorAppointments: Appointment[] = [];
    this.availableTimes = [];

    this.restService.get(this.appointmentService.appointmentUrl)
      .subscribe(appointments => {
        this.restService.get(this.appointmentService.appointmentRelationshipUrl)
          .subscribe(appointmentRelationships => {
            doctorAppointments = (appointments as Appointment[])
              .filter(appointment => {
                return (appointmentRelationships as AppointmentRelationship[])
                  .some(relation =>
                    relation.doctorId === this.doctorService.currentDoctor.doctorId &&
                    relation.appointmentId === appointment.appointmentId &&
                    appointment.startTime.toString().split('T')[0] === this.selectedDate);
              });
            for (let hour = startHour; hour <= endHour; hour++) {
              const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
              const currentFormattedTime = `${formattedHour}:00`;

              this.availableTimes.push(currentFormattedTime);
            }
            this.availableTimes = this.availableTimes.filter(date => {
              const isAppointmentTime = doctorAppointments.some(appointment => {
                return date === appointment.startTime.toString().split('T')[1].slice(0, 5);
              });
              return !isAppointmentTime;
            });
          });
      });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const dateTimeString = `${this.selectedDate}T${this.selectedTime}:00`;
      const appointmentDateTime = new Date(dateTimeString);

      appointmentDateTime.setHours(appointmentDateTime.getHours() + 2);
      this.appointmentService.appointment.startTime = appointmentDateTime;

      this.restService.post(this.appointmentService.appointmentUrl,
        this.appointmentService.appointment)
        .subscribe(result => {
          this.appointmentService.appointmentRelationship
            = new AppointmentRelationship((result as Appointment).appointmentId,
            this.doctorService.currentDoctor.doctorId, this.userService.user.userId);

          this.restService.post(this.appointmentService.appointmentRelationshipUrl,
            this.appointmentService.appointmentRelationship)
            .subscribe(result => {
              this.toastr.success("The recording was successful")
              form.form.reset();
            });
        })
      this.isDoctorSelected = false;
      this.removeGreenBorder()
    }

  }
}
