import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FilterSpecializationsPipe } from './filter-specializations.pipe';
import { Doctor } from '../models/doctor.model';

describe('FilterSpecializationsPipe', () => {
  let pipe: FilterSpecializationsPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterSpecializationsPipe],
    });

    pipe = TestBed.inject(FilterSpecializationsPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter doctors by specialization', () => {
    const doctors: Doctor[] = [
      { doctorId: 1, name: 'Doctor 1', specialization: 'Specialization 1' },
      { doctorId: 2, name: 'Doctor 2', specialization: 'Specialization 2' },
      { doctorId: 3, name: 'Doctor 3', specialization: 'Specialization 1' },
    ];

    const search = 'specialization 1';

    const filteredDoctors = pipe.transform(doctors, search);

    expect(filteredDoctors.length).toBe(2);
    expect(filteredDoctors).toEqual([
      { doctorId: 1, name: 'Doctor 1', specialization: 'Specialization 1' },
      { doctorId: 3, name: 'Doctor 3', specialization: 'Specialization 1' },
    ]);
  });

  it('should return empty array for non-matching search', () => {
    const doctors: Doctor[] = [
      { doctorId: 1, name: 'Doctor 1', specialization: 'Specialization 1' },
      { doctorId: 2, name: 'Doctor 2', specialization: 'Specialization 2' },
      { doctorId: 3, name: 'Doctor 3', specialization: 'Specialization 1' },
    ];

    const search = 'non-matching specialization';

    const filteredDoctors = pipe.transform(doctors, search);

    expect(filteredDoctors.length).toBe(0);
  });

  it('should return all doctors for empty search', () => {
    const doctors: Doctor[] = [
      { doctorId: 1, name: 'Doctor 1', specialization: 'Specialization 1' },
      { doctorId: 2, name: 'Doctor 2', specialization: 'Specialization 2' },
      { doctorId: 3, name: 'Doctor 3', specialization: 'Specialization 1' },
    ];

    const search = '';

    const filteredDoctors = pipe.transform(doctors, search);

    expect(filteredDoctors.length).toBe(3);
    expect(filteredDoctors).toEqual(doctors);
  });

  it('should handle empty doctors array', () => {
    const doctors: Doctor[] = [];
    const search = 'specialization 1';

    const filteredDoctors = pipe.transform(doctors, search);

    expect(filteredDoctors.length).toBe(0);
  });
});
