import { Pipe, PipeTransform } from '@angular/core';
import {Doctor} from "../models/doctor.model";

@Pipe({
  name: 'filterSpecializations'
})
export class FilterSpecializationsPipe implements PipeTransform {

  transform(doctors: Doctor[], search: string): Doctor[] {
    return doctors
      .filter(d => d.specialization.toLowerCase()
        .includes(search.toLowerCase()));
  }
}
