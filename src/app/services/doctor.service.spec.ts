import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DoctorService } from './doctor.service';
import { Doctor } from '../models/doctor.model';

describe('DoctorService', () => {
  let service: DoctorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DoctorService],
    });

    service = TestBed.inject(DoctorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Проверяем, что нет неподтвержденных запросов HTTP
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get doctors', () => {
    const testData: Doctor[] = [
      { doctorId: 1, name: 'Doctor 1', specialization: 'Specialization 1' },
      { doctorId: 2, name: 'Doctor 2', specialization: 'Specialization 2' }
    ];

    service.getDoctors().subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(service.doctorUrl);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should post doctor', () => {
    const testData: Doctor = { doctorId: 1, name: 'Doctor 1', specialization: 'Specialization 1' };

    service.postDoctor(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(service.doctorUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testData);
    req.flush(testData);
  });

  it('should put doctor', () => {
    const testData: Doctor = { doctorId: 1, name: 'Updated Doctor', specialization: 'Updated Specialization' };

    service.putDoctor(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${service.doctorUrl}/${testData.doctorId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(testData);
    req.flush(testData);
  });

  it('should delete doctor', () => {
    const doctorId = 1;

    service.deleteDoctor(doctorId).subscribe(data => {
      expect(data).toEqual({});
    });

    const req = httpMock.expectOne(`${service.doctorUrl}/${doctorId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
