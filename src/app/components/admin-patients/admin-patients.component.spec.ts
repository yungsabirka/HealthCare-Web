import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPatientsComponent } from './admin-patients.component';
import { UserService } from '../../services/user.service';
import { RestRequestsService } from '../../services/rest-requests.service';
import { UserLogInfoService } from '../../services/user-log-info.service';
import { of } from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {SliceArrayPipe} from "../../pipes/slice-array.pipe";
import {FilterUsersPipe} from "../../pipes/filter-users.pipe";

describe('AdminPatientsComponent', () => {
  let component: AdminPatientsComponent;
  let fixture: ComponentFixture<AdminPatientsComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let restServiceSpy: jasmine.SpyObj<RestRequestsService>;
  let userLogInfoServiceSpy: jasmine.SpyObj<UserLogInfoService>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['get']);
    restServiceSpy = jasmine.createSpyObj('RestRequestsService', ['get']);
    userLogInfoServiceSpy = jasmine.createSpyObj('UserLogInfoService', ['get']);

    TestBed.configureTestingModule({
      declarations: [AdminPatientsComponent, SliceArrayPipe, FilterUsersPipe],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: RestRequestsService, useValue: restServiceSpy },
        { provide: UserLogInfoService, useValue: userLogInfoServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AdminPatientsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate user age', () => {
    const birthDate = new Date('1990-01-01');
    const age = component.calculateUserAge(birthDate);
    const expectedAge = Math.floor((Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

    expect(age).toEqual(expectedAge);
  });
});
