import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Doctor} from "../models/doctor.model";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  public doctorUrl: string = environment.apiBaseUrl + '/Doctor'
  public currentDoctor: Doctor = new Doctor();
  constructor(private http: HttpClient) {}

  getDoctors(){
    return this.http.get(this.doctorUrl);
  }

  postDoctor(doctor: Doctor){
    return this.http.post(this.doctorUrl, doctor);
  }

  putDoctor(doctor: Doctor){
    return this.http.put(this.doctorUrl + '/' + doctor.doctorId, doctor);
  }

  deleteDoctor(doctorId: number){
    return this.http.delete(this.doctorUrl + '/' + doctorId);
  }
}
