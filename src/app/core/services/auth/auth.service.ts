import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest} from "../../models/login-request.model";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }
  login(request : LoginRequest) : Observable<User>{
    return this.http.post<User>(this.api, request);
  }
  register(user: FormData | User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }




}
