import { Component } from '@angular/core';
import {SidebarComponent} from "../../layouts/sidebar/sidebar.component";
import {NavbarComponent} from "../../layouts/navbar/navbar.component";

@Component({
  selector: 'app-points-system',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent
  ],
  templateUrl: './points-system.component.html',
  styleUrl: './points-system.component.css'
})
export class PointsSystemComponent {

}
