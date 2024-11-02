import {Component, OnInit, Output} from '@angular/core';
import {Doctor} from "../../models/doctor.model";
import {DoctorService} from "../../services/doctor.service";
import {HeaderLink} from "../../models/header-link";

@Component({
  selector: 'app-admin-doctors',
  templateUrl: './admin-doctors.component.html',
  styleUrls: ['./admin-doctors.component.css']
})
export class AdminDoctorsComponent implements OnInit{


  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Log out", "/")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care Admin Page", "/adminMainPage");
  constructor(public doctorService: DoctorService) {
  }
  doctors: Doctor[] = [];
  @Output() currentDoctor: Doctor = new Doctor();
  currentButtonNumber: number = 1;
  inputValue: string = "";
  step: number = 5;
  buttonsAmount: number = 0;

  ngOnInit(): void {
    this.updateDoctors();
  }

  onSetCurrentDoctor(doctor: Doctor){
    this.currentDoctor = Object.assign({},doctor);
  }
  updateDoctors(){
    this.doctorService.getDoctors()
      .subscribe(result => {
        this.doctors = result as Doctor[];
        this.buttonsAmount = Math.ceil(this.doctors.length / this.step);
      })
  }
  setCurrentButtonNumber(number: number){
    this.currentButtonNumber = number;
  }
  getButtonsArray(): number[] {
    return Array.from({ length: this.buttonsAmount }, (_, index) => index);
  }

}
