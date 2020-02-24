import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
=======
import {MustMatch} from '../../../_service/must-match';
>>>>>>> feature

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

  registerForm: FormGroup;
<<<<<<< HEAD
  loading: boolean = false;
  submitted: boolean = false;
=======
  loading = false;
  submitted = false;
>>>>>>> feature

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
<<<<<<< HEAD
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    },{
=======
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
>>>>>>> feature
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // TODO: access into form field
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
<<<<<<< HEAD
=======
    debugger;
>>>>>>> feature
    alert ('SUCCESS ' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
