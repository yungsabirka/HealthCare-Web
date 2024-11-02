import {Component, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {HeaderLink} from "../../models/header-link";
import {User} from "../../models/user.model";
import {RestRequestsService} from "../../services/rest-requests.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formSubmitted: boolean = false;
  patternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  newUser: User = new User();

  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Log In", "/login"),
    new HeaderLink("Sign up", "/register")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care", "");
  constructor(public userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private restService: RestRequestsService) {
  }

  onRegister(form: NgForm) {

    this.formSubmitted = true;

    if (form.valid) {
      this.formSubmitted = false;
      const getUserByEmail$ = this.userService.getUserByEmail(this.newUser);
      const getUserByName$ = this.userService.getUserByName(this.newUser);

      forkJoin([getUserByEmail$, getUserByName$])
        .subscribe(results => {
        const userByEmail = results[0];
        const userByName = results[1];

        if (userByEmail !== null) {
          this.toastr.error("The email exists");
          return;
        }

        if (userByName !== null) {
          this.toastr.error("The user name exists");
          return;
        }
        this.restService.post(this.userService.userUrl, this.newUser)
          .subscribe(() => {
            this.router.navigate(['']);
            this.toastr.success("Account was created successfully");
            form.form.reset()
          })
      });
    }
  }

}
