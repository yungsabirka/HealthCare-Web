import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Patient} from "../models/patient.model";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientUrl: string = environment.apiBaseUrl + '/Patient';
  list: Patient[] = [];
  formData: Patient = new Patient();
  constructor(private http:HttpClient) {
  }

  refreshList(){
    this.http.get(this.patientUrl)
      .subscribe({
        next: res => {
          this.list = res as Patient[];
          console.log(this.list);
        },
        error: err => {console.log(err)}
      })
  }

  getPatients(){
    return this.http.get(this.patientUrl);
  }
  postPatient(){
    return this.http.post(this.patientUrl, this.formData);
  }

  putPatient(){
    return this.http.put(this.patientUrl + '/' + this.formData.patientId, this.formData)
  }

  resetForm(form: NgForm){
    form.form.reset();
    this.formData = new Patient();
  }
  deletePatient(patientId: number){
    return this.http.delete(this.patientUrl + '/' + patientId)
  }

}
