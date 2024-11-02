import {Component, OnInit, Output} from '@angular/core';
import {HeaderLink} from "../../models/header-link";
import {UserService} from "../../services/user.service";
import {RestRequestsService} from "../../services/rest-requests.service";
import {User} from "../../models/user.model";
import {UserLogInfoService} from "../../services/user-log-info.service";
import {UserLogInfo} from "../../models/user.log.info.model";
import {DatePipe} from "@angular/common";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-admin-patients',
  templateUrl: './admin-patients.component.html',
  styleUrls: ['./admin-patients.component.css']
})
export class AdminPatientsComponent implements OnInit{
  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Log out", "/")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care Admin Page", "/adminMainPage");
  constructor(public userService: UserService,
              private restService: RestRequestsService,
              private userLogInfoService: UserLogInfoService) {
  }

  users: User[] = []
  userLogInfoList: UserLogInfo[] = [];
  currentButtonNumber: number = 1;
  inputValue: string = "";
  step: number = 3;
  buttonsAmount: number = 0;



  ngOnInit(): void {
    this.updateUsers();
  }
  updateUsers(){
    this.restService.get(this.userService.userUrl)
      .subscribe(result => {
        this.users = result as User[];
        this.buttonsAmount = Math.ceil(this.users.length / this.step);
        this.getAuthenticationUsersTime();
      })
  }
  setCurrentButtonNumber(number: number){
    this.currentButtonNumber = number;
  }
  getButtonsArray(): number[] {
    return Array.from({ length: this.buttonsAmount }, (_, index) => index);
  }

  getAuthenticationUsersTime() {
    this.users.forEach(user => {
      this.restService.get(this.userLogInfoService.userLogInfoUrl + `/userCache?userId=${user.userId}`)
        .pipe(
          catchError(error => {
            if (error.status === 404) {
              console.warn(`User log info not found for user: ${user.firstName} ${user.lastName} userId: ${user.userId}`);
              return of(null);
            } else {
              throw error;
            }
          })
        )
        .subscribe(result => {
          if (result) {
            this.userLogInfoList.push(result as UserLogInfo);
          }
        });
    });
  }
  getAuthenticationTime(userId: number): string | undefined {
    const userLogInfo = this.userLogInfoList.find(info => info.userId === userId);

    if (userLogInfo) {
      const datePipe = new DatePipe('en-US');
      return datePipe.transform(userLogInfo.authenticationTime, 'yyyy-MM-dd HH:mm:ss') || undefined;
    }

    return "This patient last checked in over 30 days ago.";
  }
  calculateUserAge(dateOfBirth: Date): number {
    const currentTime = Date.now();
    const birthTime = new Date(dateOfBirth).getTime();

    const timeDifference = currentTime - birthTime;

    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;

    return Math.floor(timeDifference / millisecondsPerYear);
  }
}
