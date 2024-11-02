import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppointmentComponent } from './appointment.component';
import { UserService } from '../../services/user.service';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';
import { RestRequestsService } from '../../services/rest-requests.service';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { AppointmentRelationship } from '../../models/appointmentRelationship.model';
import { Doctor } from '../../models/doctor.model';
import { Appointment } from '../../models/appointment.model';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Add this import

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;
  let userService: UserService;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
  let doctorServiceSpy: jasmine.SpyObj<DoctorService>;
  let restServiceSpy: jasmine.SpyObj<RestRequestsService>;

  beforeEach(() => {
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['getAppointmentRelationshipUrl']);
    doctorServiceSpy = jasmine.createSpyObj('DoctorService', ['getDoctorUrl']);
    restServiceSpy = jasmine.createSpyObj('RestRequestsService', ['get']);

    TestBed.configureTestingModule({
      declarations: [AppointmentComponent],
      providers: [
        UserService,
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: DoctorService, useValue: doctorServiceSpy },
        { provide: RestRequestsService, useValue: restServiceSpy },
      ],
      imports: [HttpClientTestingModule], // Add this line
    });

    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService); // Inject the real service for use in the tests
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return No Date', () => {
    const testDate = undefined;
    const formattedDate = component.getDate(testDate);

    expect(formattedDate.toLowerCase()).toBe('no date');
  });

  it('should return No Time', () => {
    const testDate = undefined;
    const formattedTime = component.getTime(testDate);

    expect(formattedTime.toLowerCase()).toBe('no time');
  });

  it('should get doctor appointment keys', () => {
    const doctor1 = new Doctor();
    const doctor2 = new Doctor();
    const appointment1 = new Appointment();
    const appointment2 = new Appointment();

    component.doctorAppointmentMap.set(doctor1, appointment1);
    component.doctorAppointmentMap.set(doctor2, appointment2);

    const keys = component.getDoctorAppointmentKeys();

    expect(keys).toContain(doctor1);
    expect(keys).toContain(doctor2);
    expect(keys.length).toBe(2);
  });

});
