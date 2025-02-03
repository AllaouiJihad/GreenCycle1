import { Component } from '@angular/core';
import { Role, User } from "../../core/models/user.model";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corrigé de 'styleUrl' à 'styleUrls'
})
export class RegisterComponent {
  selectedUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    city: '',
    phone: '',
    birthDate: new Date(), // Initialisé avec une nouvelle date
    profilePicture: '', // Initialisé avec null
    role: Role.PARTICULAR,
    createdAt: new Date(), // Initialisé avec une nouvelle date
    updatedAt: new Date() // Initialisé avec une nouvelle date
  };
}
