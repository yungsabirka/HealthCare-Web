import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MedicationService } from './medication.service';
import { Medication } from '../models/medication.model';

describe('MedicationService', () => {
  let service: MedicationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedicationService],
    });

    service = TestBed.inject(MedicationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Проверяем, что нет неподтвержденных запросов HTTP
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get medications', () => {
    const testData: Medication[] = [
      { medicationId: 1, medicationName: 'Medication 1', description: 'Description 1', type: 'Type 1', contraindications: 'Contraindications 1' },
      { medicationId: 2, medicationName: 'Medication 2', description: 'Description 2', type: 'Type 2', contraindications: 'Contraindications 2' }
    ];

    service.getMedications().subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(service.medicationUrl);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should post medication', () => {
    const testData: Medication = { medicationId: 1, medicationName: 'Medication 1', description: 'Description 1', type: 'Type 1', contraindications: 'Contraindications 1' };

    service.postMedication(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(service.medicationUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testData);
    req.flush(testData);
  });

  it('should put medication', () => {
    const testData: Medication = { medicationId: 1, medicationName: 'Updated Medication', description: 'Updated Description', type: 'Updated Type', contraindications: 'Updated Contraindications' };

    service.putMedication(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${service.medicationUrl}/${testData.medicationId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(testData);
    req.flush(testData);
  });

  it('should delete medication', () => {
    const medicationId = 1;

    service.deleteMedication(medicationId).subscribe(data => {
      expect(data).toEqual({});
    });

    const req = httpMock.expectOne(`${service.medicationUrl}/${medicationId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
