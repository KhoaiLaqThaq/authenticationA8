import {Component, OnInit} from '@angular/core';
import {User} from '../../_model/user';
import {UserService} from '../../_service/user.service';
import {AuthenticationService} from '../../_service/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  today: number = Date.now();
  users = [];

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    // this.loading = true;
    // this.getUserById();
    this.loadAllUsers();;
  }

  deleteUser( id: number ) {
    this.userService.delete( id )
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers();
      });
  }

  private loadAllUsers() {
    this.userService.getAllUsers()
      .pipe(first())
      .subscribe(users => this.users = users );
  }

}
