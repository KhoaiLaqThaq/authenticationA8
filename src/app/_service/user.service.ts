import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {HttpClient} from '@angular/common/http';
import {User} from '../_model/user';
import {environment} from '../../environments/environment';
=======
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../_model/user';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
>>>>>>> feature

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>( `${ environment.JSON_SERVER }/users`).pipe(
      tap(),
      catchError(err => of([]))
    );
  }

  getUserById( id: number ): Observable<User> {
    return this.http.get<User>(`${ environment.JSON_SERVER }/users/${ id }`)
      .pipe(
        tap(user => console.log(`user = ${JSON.stringify(user)}`)),
        catchError(err => of(new User()))
      );
  }

  delete( id: number ): Observable<User> {
    return this.http.delete(`${environment.JSON_SERVER}/users/${ id }`, httpOptions)
      .pipe(
        tap(_ => console.log(`DELETE Success`)),
        catchError(err => of(null))
      );
  }

<<<<<<< HEAD
  delete( id: number ) {
    return this.http.delete(`${environment.JSON_SERVER}/users/${ id }`);
=======
  update(updateUser: User): Observable<User> {
    return this.http.put(`${environment.JSON_SERVER}/users/${updateUser.id}`, updateUser, httpOptions )
      .pipe(
        tap((user: User) => console.log(`Update user ${JSON.stringify(user)}`)),
        catchError(err => of(new User()))
      );
>>>>>>> feature
  }

  register( newUser: User ): Observable<User> {
    return this.http.post<User>( `${environment.JSON_SERVER}/users`, newUser, httpOptions)
      .pipe(
        tap( (user: User) => console.log('new user', user)),
        catchError(err => of(new User()))
      );
  }
}
