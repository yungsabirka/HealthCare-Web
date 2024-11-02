import {Component, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {forkJoin} from "rxjs";
import {Admin} from "../../models/admin.model";
import {HeaderLink} from "../../models/header-link";
import {RestRequestsService} from "../../services/rest-requests.service";
import {UserLogInfoService} from "../../services/user-log-info.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  userRouterLink: string = "";
  adminRouterLink: string = "adminMainPage"
  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Log In", "/login"),
    new HeaderLink("Sign up", "/register")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care", "");
  constructor(public userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private restService: RestRequestsService,
              private userLogInfoService: UserLogInfoService) {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const getAdminByName$ = this.userService.getAdminAccounts(this.userService.user);
      const getUserByName$ = this.userService.getUserByName(this.userService.user);

      forkJoin([getUserByName$, getAdminByName$])
        .subscribe(result => {
          if (result[0] === null && result[1] === null) {
            this.toastr.error("The user name doesn't exist");
            return;
          } else {
            if(result[0] !== null){
              if ((result[0] as User).address == "") {
                this.userRouterLink = "userInfoForm"
              } else {
                this.userRouterLink = "userMainPage"
              }
            }
            if (this.checkPassword(result[0], this.userRouterLink, form)){
              const userId = (result[0] as User).userId;
              this.restService
                .post(this.userLogInfoService.userLogInfoUrl + `/AddUser?userId=${userId}`, userId)
                .subscribe();
              return;
            }
            this.checkPassword(result[1], this.adminRouterLink, form)
          }

        })
    }
  }

  checkPassword(user: Object, navigateLink: string, form: NgForm): boolean {
    if (user !== null) {
      if ((user as User).password !== this.userService.user.password) {
        this.toastr.error("The password is not correct");
      } else {
        this.userService.user = user as User;
        localStorage.setItem('userData', JSON.stringify(user))
        this.successLogin(navigateLink, form);
        return true;
      }
    }
    return false;
  }

  successLogin(navigateLink: string, form: NgForm) {
    this.router.navigate([navigateLink]);
    this.toastr.success("You log in successfully");
    //form.form.reset();
  }
}
