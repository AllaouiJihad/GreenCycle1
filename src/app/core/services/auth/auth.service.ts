import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user.model";
import {Observable} from "rxjs";
import {LoginRequest} from "../../models/login-request.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }
  login(request : LoginRequest) : Observable<any>{
    return this.api.post<LoginRequest>(this.api, request);
  }
}
