import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminMainPageComponent } from './admin-main-page.component';
import { DoctorService } from '../../services/doctor.service';
import { MedicationService } from '../../services/medication.service';
import { UserService } from '../../services/user.service';
import { RestRequestsService } from '../../services/rest-requests.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('AdminMainPageComponent', () => {
  let component: AdminMainPageComponent;
  let fixture: ComponentFixture<AdminMainPageComponent>;

  // Mock services
  const doctorServiceMock = jasmine.createSpyObj('DoctorService', ['getDoctors']);
  const medicationServiceMock = jasmine.createSpyObj('MedicationService', ['getMedications']);
  const userServiceMock = jasmine.createSpyObj('UserService', ['getUser']);
  const restServiceMock = jasmine.createSpyObj('RestRequestsService', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMainPageComponent],
      providers: [
        { provide: DoctorService, useValue: doctorServiceMock },
        { provide: MedicationService, useValue: medicationServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: RestRequestsService, useValue: restServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AdminMainPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
