import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../_model/user";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor( private http: HttpClient ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // TODO: Login service
  login( username: string, password: string ) {
    return this.http.post<any>(`${environment.JSON_SERVER}/users/authenticate`, {username, password})
      .pipe(
        map( user => {
          // TODO: login successful if there's a jwt token in the response
          if ( user && user.token ) {
            // TODO: store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  // TODO: Logout service
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
