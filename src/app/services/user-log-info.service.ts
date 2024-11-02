import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserLogInfoService {

  public readonly userLogInfoUrl: string = environment.apiBaseUrl + '/UserCache'
  constructor() { }
}
