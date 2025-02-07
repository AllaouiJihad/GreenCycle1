import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Corrige ici pour `styleUrls`
})
export class SidebarComponent {
  isSidebarActive = false;
  toggleSidebar() {
    console.log("SidebarComponent");
    this.isSidebarActive = !this.isSidebarActive;
  }
}
