import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AdminMedicalCardComponent } from './admin-medical-card.component';
import { MedicalCardService } from '../../services/medical-card.service';
import { RestRequestsService } from '../../services/rest-requests.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MedicalCard } from '../../models/medical-card.model';
import {HttpClient} from "@angular/common/http";
import {HttpClientModule} from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import {ToastrModule} from "ngx-toastr";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('AdminMedicalCardComponent', () => {
  let component: AdminMedicalCardComponent;
  let fixture: ComponentFixture<AdminMedicalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMedicalCardComponent, NgForm],
      providers: [
        RestRequestsService,
        MedicalCardService,
        ToastrService,
        HttpClient,
      ],
      imports: [HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMedicalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle form submission', () => {
    // const userService = TestBed.inject(UserService);
    const restService = TestBed.inject(RestRequestsService);
    const medicalCardService = TestBed.inject(MedicalCardService);

    spyOn(restService, 'get').and.returnValue(of([]));
    spyOn(restService, 'post').and.returnValue(of({}));
    spyOn(restService, 'put').and.returnValue(of({}));

    component.currentPatient = new User();
    component.currentPatient.userId = 1;

    component.onSubmit({ valid: true } as NgForm);

    expect(restService.get).toHaveBeenCalled();
    expect(restService.post).toHaveBeenCalled();
  });

});
