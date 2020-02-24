import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
<<<<<<< HEAD
import {User} from '../_model/user';
import {Role} from '../_model/role';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';


const users: User[] = [
  { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'My', role: Role.Admin, age: '2000-12-12'},
  { id: 2, username: 'user', password: '123123', firstName: 'User', lastName: 'My', role: Role.User, age: '1996-11-11'},
];
=======
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

import {User} from '../_model/user';
import {Role} from '../_model/role';
import {UserService} from '../_service';
>>>>>>> feature

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  users: User[];

  constructor(
    private userService: UserService
  ) {
    this.getAllUser();
  }

  getAllUser(): void {
    this.userService.getAllUsers().subscribe(receivedUsers => this.users = receivedUsers);
  }

  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // TODO: wrap in delayed observable to simulate server api call
    return of( null )
      .pipe(mergeMap( handleRoute ))
      .pipe(materialize())  // TODO: call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      debugger;
      switch (true) {
<<<<<<< HEAD
        case url.endsWith('/users/authenticate') && method === 'POST':
          debugger;
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          debugger;
          return register();
        case url.endsWith('/users') && method === 'GET':
          debugger;
          return getUsers();
=======
        case url.endsWith('/users**') && method === 'GET':
          return authenticate();
        /*case url.endsWith('/users/register') && method === 'POST':
          debugger;
          return register();*/
       /* case url.endsWith('/users') && method === 'GET':
          return getUsers();*/
>>>>>>> feature
        case url.match(/\/users\/\d+$/) && method === 'GET':
          debugger;
          return getUserById();
        default:
          debugger;
          return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
<<<<<<< HEAD
      const user = users.find(x => x.username === username && x.password === password);
=======
      const user = this.users.find(x => x.username === username && x.password === password);
>>>>>>> feature
      if (!user) { return error('Username or password is incorrect'); }
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`
      });
    }

    function getUsers() {
      if (!isAdmin()) { return unauthorised(); }
<<<<<<< HEAD
      return ok( users );
=======
      return ok( this.users );
>>>>>>> feature
    }

    function getUserById() {
      if (!isLoggedIn()) { return unauthorised(); }

      if (!isAdmin() && currentUser().id !== idFromUrl()) { return unauthorised(); }

      const user = this.users.find(x => x.id === idFromUrl());
      return ok(user);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function isAdmin() {
      return isLoggedIn() && currentUser().role === Role.Admin;
    }

    function currentUser() {
      if (!isLoggedIn()) { return; }

      const id = parseInt(headers.get('Authorization').split('.')[1]);
      return this.users.find(x => x.id === id);
    }

    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function ok( body? ) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorised() {
      return throwError({ status: 401, error: { message: 'Unauthorised' }});
    }

    function error( message ) {
      return throwError({ status: 400, error: { message } });
    }
  }
}

export let  fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi:  true
};
