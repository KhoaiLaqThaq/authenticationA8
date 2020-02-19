import { Component, OnInit } from '@angular/core';
import {User} from "../../_model/user";
import {UserService} from "../../_service/user.service";
import {AuthenticationService} from "../../_service/authentication.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // loading= false;
  currentUser: User;
  // userFromApi: User;
  users = [];

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;

    // TODO-DEBUG: debug
    debugger;
  }

  ngOnInit() {
    // this.loading = true;
    // this.getUserById();
    this.loadAllUsers();

    // TODO-DEBUG: debug
    debugger;
  }

  deleteUser( id: number ) {
    this.userService.delete( id )
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers()

        // TODO-DEBUG: debug
        debugger;
      });

    // TODO-DEBUG: debug
    debugger;
  }

  private loadAllUsers() {
    this.userService.getAllUsers()
      .pipe(first())
      .subscribe(users => this.users = users );
  }

  // getUserById() {
  //   this.userService.getUserById(this.currentUser.id)
  //     .pipe( first()).subscribe( user => {
  //       this.loading = false;
  //       // this.userFromApi = user;
  //   })
  // }

}
