import { TestBed } from '@angular/core/testing';
import { FilterDoctorsPipe } from './filter-doctors.pipe';
import {Doctor} from "../models/doctor.model";

describe('FilterDoctorsPipe', () => {
  let pipe: FilterDoctorsPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterDoctorsPipe]
    });

    pipe = TestBed.inject(FilterDoctorsPipe);
  });

  it('should create an instance of FilterDoctorsPipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter doctors based on search string', () => {
    const doctors = [
      { doctorId: 1, name: 'John Doe', specialization: 'Cardiologist' },
      { doctorId: 2, name: 'Jane Smith', specialization: 'Orthopedic Surgeon' },
      { doctorId: 3, name: 'Bob Johnson', specialization: 'Dermatologist' },
    ];

    expect(pipe.transform(doctors, 'smith')).toEqual([{ doctorId: 2, name: 'Jane Smith', specialization: 'Orthopedic Surgeon' }]);

    expect(pipe.transform(doctors, '')).toEqual(doctors);

    expect(pipe.transform(doctors, 'xyz')).toEqual([]);
  });

  it('should handle empty array of doctors', () => {
    const doctors: Doctor[] = [];
    expect(pipe.transform(doctors, 'john')).toEqual([]);
  });

});
