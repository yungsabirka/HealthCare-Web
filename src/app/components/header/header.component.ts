import {Component, Input} from '@angular/core';
import {HeaderLink} from "../../models/header-link";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() navigationLinks: HeaderLink[] = [];
  @Input() logoLink: HeaderLink = new HeaderLink("", "");


}
