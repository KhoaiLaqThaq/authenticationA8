import { Component, OnInit } from '@angular/core';
import {User} from "../../_model/user";
import {UserService} from "../../_service/user.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loading = false;
  users: User[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .pipe(first()).subscribe( users => {
        this.loading = false;
        this.users = users;
    });
  }

}
