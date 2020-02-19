import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_service/authentication.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../../_service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if ( this.authenticationService.currentUserValue ) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // TODO: get return url from route params of default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // TODO: reset alerts on submit
    this.alertService.clear();
    // TODO: stop here if from is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    // tslint:disable-next-line:no-debugger
    debugger;
    this.authenticationService.login( this.f.username.value, this.f.password.value )
      .pipe( first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          debugger;
        },
        error => {
          this.error = error;
          this.alertService.error( error );
          this.loading = false;
        }
      );
  }
}
