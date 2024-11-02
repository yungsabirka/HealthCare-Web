import {Component, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {RestRequestsService} from "../../services/rest-requests.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {HeaderLink} from "../../models/header-link";

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.css']
})
export class UserInfoFormComponent {
  putUserUrl: string = "";
  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Profile", "/userProfile"),
    new HeaderLink("Log out", "")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care", "/userMainPage");

  constructor(public userService: UserService,
              private restService: RestRequestsService,
              private toastr: ToastrService,
              private router: Router) {
    this.putUserUrl = userService.userUrl + '/' + userService.user.userId;
    console.log(this.putUserUrl);
  }

  onSubmit(form: NgForm) {
    console.log(this.userService.user)
    if (form.valid) {
      this.restService.put(this.putUserUrl, this.userService.user)
        .subscribe(result => {
          this.toastr.success("Changed successful");
          this.router.navigate(['userMainPage']);
          form.form.reset();
        })
    }
  }
}
