import { Pipe, PipeTransform } from '@angular/core';
import {Doctor} from "../models/doctor.model";

@Pipe({
  name: 'filterDoctors'
})
export class FilterDoctorsPipe implements PipeTransform {

  transform(doctors: Doctor[], search: string): Doctor[] {
    return doctors
      .filter(d => d.name.toLowerCase()
        .includes(search.toLowerCase()));
  }

}
