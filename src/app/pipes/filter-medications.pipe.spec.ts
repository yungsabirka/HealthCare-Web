import { TestBed } from '@angular/core/testing';
import { FilterMedicationsPipe } from './filter-medications.pipe';
import {Medication} from "../models/medication.model";

describe('FilterMedicationsPipe', () => {
  let pipe: FilterMedicationsPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterMedicationsPipe]
    });

    pipe = TestBed.inject(FilterMedicationsPipe);
  });

  it('should create an instance of FilterMedicationsPipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter medications based on search string', () => {
    const medications = [
      { medicationId: 1, medicationName: 'Aspirin', description: 'Pain reliever', type: 'NSAID', contraindications: 'Allergies' },
      { medicationId: 2, medicationName: 'Ibuprofen', description: 'Anti-inflammatory', type: 'NSAID', contraindications: 'Stomach issues' },
      { medicationId: 3, medicationName: 'Paracetamol', description: 'Fever reducer', type: 'Acetaminophen', contraindications: 'Liver problems' },
    ];

    expect(pipe.transform(medications, 'aspirin')).toEqual([{ medicationId: 1, medicationName: 'Aspirin', description: 'Pain reliever', type: 'NSAID', contraindications: 'Allergies' }]);
    expect(pipe.transform(medications, 'ibuprofen')).toEqual([{ medicationId: 2, medicationName: 'Ibuprofen', description: 'Anti-inflammatory', type: 'NSAID', contraindications: 'Stomach issues' }]);

    expect(pipe.transform(medications, '')).toEqual(medications);

    expect(pipe.transform(medications, 'xyz')).toEqual([]);
  });

  it('should handle empty array of medications', () => {
    const medications: Medication[] = [];
    expect(pipe.transform(medications, 'aspirin')).toEqual([]);
  });

});
