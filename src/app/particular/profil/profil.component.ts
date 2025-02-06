import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user.model';
import { UserService } from "../../core/services/user/user.service";
import {SidebarComponent} from "../../layouts/sidebar/sidebar.component";
import {NavbarComponent} from "../../layouts/navbar/navbar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profil',
  standalone: true,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports: [
    SidebarComponent,
    NavbarComponent,
    NgIf
  ]
})
export class ProfilComponent implements OnInit {
  user?: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const userId = localStorage.getItem("userId");

    console.log("Valeur brute de userId dans localStorage:", userId);

    if (userId) {
      console.log("User ID récupéré:", userId);

      this.userService.getUserById(userId).subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
      );
    } else {
      console.warn("Aucun ID utilisateur trouvé dans le localStorage.");
    }
  }
}
