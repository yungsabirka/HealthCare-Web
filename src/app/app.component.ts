import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SliceArrayPipe} from "./pipes/slice-array.pipe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HealthCare';
}
