import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createLoginValidator} from "../../core/validators/login-validators";
import {LoginRequest} from "../../core/models/login-request.model";
import { AuthActions } from "../../core/stores/auth/auth.actions";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private store: Store, private fb: FormBuilder) {}
  ngOnInit() {
    this.loginForm = createLoginValidator(this.fb);
  }
  onSubmit() {
    const formValues = this.loginForm.getRawValue();
    const login : LoginRequest = {
      email : formValues.email,
      password: formValues.password,
    }
    this.store.dispatch(AuthActions.loginUser({ login }));
  }
}
