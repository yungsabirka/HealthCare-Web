import {Component, OnInit, Output} from '@angular/core';
import {HeaderLink} from "../../models/header-link";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  @Output() navigationLinks: HeaderLink[] = [
    new HeaderLink("Log In", "/login"),
    new HeaderLink("Sign up", "/register")
  ]
  @Output() logoLink: HeaderLink = new HeaderLink("Health Care", "");

  ngOnInit(){
    localStorage.removeItem('userData');
  }
}
