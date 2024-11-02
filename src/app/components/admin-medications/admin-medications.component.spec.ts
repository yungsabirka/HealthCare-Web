import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMedicationsComponent } from './admin-medications.component';
import { MedicationService } from '../../services/medication.service';
import { of } from 'rxjs';
import { Medication } from '../../models/medication.model';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {SliceArrayPipe} from "../../pipes/slice-array.pipe";
import {FilterMedicationsPipe} from "../../pipes/filter-medications.pipe";

describe('AdminMedicationsComponent', () => {
  let component: AdminMedicationsComponent;
  let fixture: ComponentFixture<AdminMedicationsComponent>;
  let medicationServiceSpy: jasmine.SpyObj<MedicationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MedicationService', ['getMedications']);

    TestBed.configureTestingModule({
      declarations: [AdminMedicationsComponent, SliceArrayPipe, FilterMedicationsPipe],
      providers: [{ provide: MedicationService, useValue: spy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AdminMedicationsComponent);
    component = fixture.componentInstance;
    medicationServiceSpy = TestBed.inject(MedicationService) as jasmine.SpyObj<MedicationService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update medications on ngOnInit', () => {
    const medications: Medication[] = [
      { medicationId: 1, medicationName: 'Medication 1', description: 'Desc 1', type: 'Type 1', contraindications: 'Contra 1' },
      { medicationId: 2, medicationName: 'Medication 2', description: 'Desc 2', type: 'Type 2', contraindications: 'Contra 2' }
    ];

    medicationServiceSpy.getMedications.and.returnValue(of(medications));

    fixture.detectChanges();

    expect(component.medications).toEqual(medications);
    expect(component.buttonsAmount).toBe(Math.ceil(medications.length / component.step));
  });

  it('should set currentMedication on onSetCurrentMedication', () => {
    const medication: Medication = { medicationId: 1, medicationName: 'Medication 1', description: 'Desc 1', type: 'Type 1', contraindications: 'Contra 1' };

    component.onSetCurrentMedication(medication);

    expect(component.currentMedication).toEqual(medication);
  });

  it('should set currentButtonNumber on setCurrentButtonNumber', () => {
    const number = 2;

    component.setCurrentButtonNumber(number);

    expect(component.currentButtonNumber).toBe(number);
  });

  it('should generate correct buttons array on getButtonsArray', () => {
    component.buttonsAmount = 3;

    const buttonsArray = component.getButtonsArray();

    expect(buttonsArray).toEqual([0, 1, 2]);
  });
});
