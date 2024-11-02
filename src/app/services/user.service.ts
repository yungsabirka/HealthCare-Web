import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly userUrl: string = environment.apiBaseUrl + '/User';
  private adminUrl: string = environment.apiBaseUrl + '/Admin'
  user: User = new User()

  constructor(private http: HttpClient) {
    const storedData = localStorage.getItem('userData');
    this.user = storedData ? JSON.parse(storedData) : new User();
  }

  getUserByName(newUser: User){
    return this.http.get(`${this.userUrl}/ByUserName/${newUser.userName}`);
  }
  getUserByEmail(newUser: User){
    return this.http.get(`${this.userUrl}/ByEmail/${newUser.email}`);
  }
  postUser(){
    return this.http.post(this.userUrl, this.user);
  }
  getAdminAccounts(newUser: User){
    return this.http.get(`${this.adminUrl}/ByAdminName/${newUser.userName}`);
  }
}
