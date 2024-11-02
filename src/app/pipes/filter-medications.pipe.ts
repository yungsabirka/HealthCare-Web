import { Pipe, PipeTransform } from '@angular/core';
import {Medication} from "../models/medication.model";

@Pipe({
  name: 'filterMedications'
})
export class FilterMedicationsPipe implements PipeTransform {

  transform(medications: Medication[], search: string): Medication[] {
    return medications
      .filter(d => d.medicationName.toLowerCase()
        .includes(search.toLowerCase()));
  }
}
