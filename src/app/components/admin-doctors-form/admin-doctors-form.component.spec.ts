import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDoctorsFormComponent } from './admin-doctors-form.component';
import { ToastrService } from 'ngx-toastr';
import {FormsModule, NgForm} from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { AdminDoctorsComponent } from '../admin-doctors/admin-doctors.component';
import {Observable, of} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('AdminDoctorsFormComponent', () => {
  let component: AdminDoctorsFormComponent;
  let fixture: ComponentFixture<AdminDoctorsFormComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let doctorServiceSpy: jasmine.SpyObj<DoctorService>;
  let adminDoctorsComponentSpy: jasmine.SpyObj<AdminDoctorsComponent>;

  beforeEach(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    doctorServiceSpy = jasmine.createSpyObj('DoctorService', [
      'postDoctor',
      'putDoctor',
      'deleteDoctor',
    ]);
    adminDoctorsComponentSpy = jasmine.createSpyObj('AdminDoctorsComponent', [
      'updateDoctors',
    ]);

    TestBed.configureTestingModule({
      declarations: [AdminDoctorsFormComponent, NgForm],
      providers: [
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: DoctorService, useValue: doctorServiceSpy },
        { provide: AdminDoctorsComponent, useValue: adminDoctorsComponentSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(AdminDoctorsFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call insertRecord when onSubmit is called with a valid form and doctorId is 0', () => {
    const form = { valid: true } as NgForm;
    component.currentDoctor.doctorId = 0;

    spyOn(component, 'insertRecord');

    component.onSubmit(form);

    expect(component.insertRecord).toHaveBeenCalledWith(form);
  });

  it('should call updateRecord when onSubmit is called with a valid form and doctorId is not 0', () => {
    const form = { valid: true } as NgForm;
    component.currentDoctor.doctorId = 1;

    spyOn(component, 'updateRecord');

    component.onSubmit(form);

    expect(component.updateRecord).toHaveBeenCalledWith(form);
  });

  it('should show error toastr message when onSubmit is called with an invalid form', () => {
    const form = { valid: false } as NgForm;

    component.onSubmit(form);

    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Form is not valid');
  });

  it('should call successfullyChanged with postDoctor when insertRecord is called', () => {
    const form = {} as NgForm;
    doctorServiceSpy.postDoctor.and.returnValue(of({}));

    spyOn(component, 'successfullyChanged');

    component.insertRecord(form);

    expect(component.successfullyChanged).toHaveBeenCalledWith(
      doctorServiceSpy.postDoctor(component.currentDoctor),
      form,
      'Inserted'
    );
  });

  it('should call successfullyChanged with putDoctor when updateRecord is called', () => {
    const form = {} as NgForm;
    doctorServiceSpy.putDoctor.and.returnValue(of({}));

    spyOn(component, 'successfullyChanged');

    component.updateRecord(form);

    expect(component.successfullyChanged).toHaveBeenCalledWith(
      doctorServiceSpy.putDoctor(component.currentDoctor),
      form,
      'Updated'
    );
  });

  it('should show error toastr message when onDeleteDoctor is called with an invalid form', () => {
    const form = { valid: false } as NgForm;

    component.onDeleteDoctor(form);

    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Can not delete');
  });

  it('should not call successfullyChanged when onDeleteDoctor is called with doctorId 0', () => {
    const form = { valid: true } as NgForm;
    component.currentDoctor.doctorId = 0;

    spyOn(component, 'successfullyChanged');

    component.onDeleteDoctor(form);

    expect(component.successfullyChanged).not.toHaveBeenCalled();
  });

  it('should not call successfullyChanged when onDeleteDoctor is called and user cancels the confirmation', () => {
    const form = { valid: true } as NgForm;
    component.currentDoctor.doctorId = 1;
    spyOn(window, 'confirm').and.returnValue(false);

    spyOn(component, 'successfullyChanged');

    component.onDeleteDoctor(form);

    expect(component.successfullyChanged).not.toHaveBeenCalled();
  });
});
