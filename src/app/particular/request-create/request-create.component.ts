import { Component } from '@angular/core';
import {SidebarComponent} from "../../layouts/sidebar/sidebar.component";

@Component({
  selector: 'app-request-create',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent {

}
