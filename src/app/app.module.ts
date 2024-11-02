import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, NgForm} from "@angular/forms";
import {PatientComponent} from "./components/patient/patient.component";
import {PatientFormComponent} from "./components/patient-form/patient-form.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { MainPageComponent } from './components/main-page/main-page.component';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {RouterModule, Routes} from "@angular/router";
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AdminMainPageComponent } from './components/admin-main-page/admin-main-page.component';
import { AdminPatientsComponent } from './components/admin-patients/admin-patients.component';
import { AdminDoctorsComponent } from './components/admin-doctors/admin-doctors.component';
import { AdminMedicationsComponent } from './components/admin-medications/admin-medications.component';
import { FilterDoctorsPipe } from './pipes/filter-doctors.pipe';
import { SliceArrayPipe } from './pipes/slice-array.pipe';
import { FilterMedicationsPipe } from './pipes/filter-medications.pipe';
import { AdminDoctorsFormComponent } from './components/admin-doctors-form/admin-doctors-form.component';
import { AdminMedicationsFormComponent } from './components/admin-medications-form/admin-medications-form.component';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { UserInfoFormComponent } from './components/user-info-form/user-info-form.component';
import { HeaderComponent } from './components/header/header.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FilterSpecializationsPipe } from './pipes/filter-specializations.pipe';
import { UserAppointmentsComponent } from './components/user-appointments/user-appointments.component';
import { FilterUsersPipe } from './pipes/filter-users.pipe';
import { AdminMedicalCardComponent } from './components/admin-medical-card/admin-medical-card.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PatientMedicationsComponent } from './components/patient-medications/patient-medications.component';
import { UserMedicalCardComponent } from './components/user-medical-card/user-medical-card.component';

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LogInComponent},
  {path: 'adminMainPage', component: AdminMainPageComponent},
  {path: 'adminMainPage/doctors', component:AdminDoctorsComponent},
  {path: 'adminMainPage/medications', component: AdminMedicationsComponent},
  {path: "adminMainPage/patients", component: AdminPatientsComponent},
  {path: "adminMainPage/patients/:userId", component: AdminMedicalCardComponent},
  {path: 'userMainPage', component: UserMainPageComponent},
  {path: 'userInfoForm', component: UserInfoFormComponent},
  {path: "userProfile", component: UserProfileComponent},
  {path: "userAppointments/:userId", component: UserAppointmentsComponent},
  {path: "userMedicalCard", component: UserMedicalCardComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientFormComponent,
    MainPageComponent,
    RegisterComponent,
    FooterComponent,
    LogInComponent,
    AdminMainPageComponent,
    AdminPatientsComponent,
    AdminDoctorsComponent,
    AdminMedicationsComponent,
    FilterDoctorsPipe,
    SliceArrayPipe,
    FilterMedicationsPipe,
    AdminDoctorsFormComponent,
    AdminMedicationsFormComponent,
    UserMainPageComponent,
    UserInfoFormComponent,
    HeaderComponent,
    UserProfileComponent,
    FilterSpecializationsPipe,
    UserAppointmentsComponent,
    FilterUsersPipe,
    AdminMedicalCardComponent,
    AppointmentComponent,
    PatientMedicationsComponent,
    UserMedicalCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgOptimizedImage,
    RouterLink,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
