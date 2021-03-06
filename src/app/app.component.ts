<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import {Component, Input} from '@angular/core';
>>>>>>> feature
import {User} from './_model/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './_service/authentication.service';
import {Role} from './_model/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  @Input() navLv: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
