import { Pipe, PipeTransform } from '@angular/core';
import {Doctor} from "../models/doctor.model";
import {User} from "../models/user.model";

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: User[], search: string): User[] {
    return users
      .filter(u => u.firstName.toLowerCase()
        .includes(search.toLowerCase()));
  }

}
