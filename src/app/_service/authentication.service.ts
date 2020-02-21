import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../_model/user';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {ok} from 'assert';

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
  login( username: string, password: string ): Observable<User> {
    const url = `${environment.JSON_SERVER}/users?username=${username}&password=${password}`;
    // console.log(`------------ ${url}`);
    // debugger;
    return this.http.get<User>(url)
      .pipe(
        tap( user => {
          // if ( user && user.token ) {
          //   debugger;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          // }
          // debugger;
            return ok({
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              token: `fake-jwt-token.${user.id}`
          });
        }),
        catchError(err => of(new User()))
      );
  }

  // TODO: Logout service
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
