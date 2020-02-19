import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_model/user';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  getAllUsers() {
    return this.http.get<User[]>( `${ environment.JSON_SERVER }/users`);
  }

  getUserById( id: number ) {
    return this.http.get<User>(`${ environment.JSON_SERVER }/users/${ id }`);
  }

  delete( id: number ) {
    return this.http.delete(`${environment.JSON_SERVER}/users/${ id }`);
  }

  register( user: User ) {
    return this.http.post(`${environment.JSON_SERVER}/users/register`, user);
  }
}
