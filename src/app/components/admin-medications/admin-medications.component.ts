import {Component, NgModule, OnInit, Output} from '@angular/core';
import {Medication} from "../../models/medication.model";
import {MedicationService} from "../../services/medication.service";
import {HeaderLink} from "../../models/header-link";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {SliceArrayPipe} from "../../pipes/slice-array.pipe";

@Component({
  selector: 'app-admin-medications',
  templateUrl: './admin-medications.component.html',
  styleUrls: ['./admin-medications.component.css']
})
export class AdminMedicationsComponent implements OnInit {

  currentButtonNumber: number = 1;
  inputValue: string = "";
  step: number = 5;
  buttonsAmount: number = 0;
  medications: Medication[] = [];
  @Output() currentMedication = new Medication();

  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Log out", "/")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care Admin Page", "/adminMainPage");
  constructor(public medicationService: MedicationService) {
  }

  ngOnInit(): void {
    this.updateMedications();
  }

  onSetCurrentMedication(medication: Medication) {
    this.currentMedication = Object.assign({}, medication);
  }

  updateMedications() {
    this.medicationService.getMedications()
      .subscribe(result => {
        this.medications = result as Medication[];
        this.buttonsAmount = Math.ceil(this.medications.length / this.step);
      })
  }

  setCurrentButtonNumber(number: number) {
    this.currentButtonNumber = number;
  }

  getButtonsArray(): number[] {
    return Array.from({length: this.buttonsAmount}, (_, index) => index);
  }

}
