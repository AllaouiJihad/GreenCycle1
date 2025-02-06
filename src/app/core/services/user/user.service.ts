import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.api);
  }
  createUser(request : User) : Observable<User> {
    return this.http.post<User>(this.api, request);
  }
  getUserById(userId: string | number): Observable<User> {
    return this.http.get<User>(`${this.api}/${userId}`);
  }


}
