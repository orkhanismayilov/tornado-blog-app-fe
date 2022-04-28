import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormErrors } from 'src/app/shared/interfaces/form-errors';

import { AbstractAuthComponent } from '../abstract-auth-component.spec';
import { Fieldsets } from '../interfaces/fieldsets';
import { SignUpData } from '../interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent extends AbstractAuthComponent {

  fieldsets: Fieldsets = {
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, this.emailValidators],
    password: [null, this.passwordValidators],
  };

  errorsMap: FormErrors = {
    firstName: {
      required: 'First name is required',
    },
    lastName: {
      required: 'Last name is required',
    },
    email: {
      required: 'Email is required',
      email: 'Email is invalid',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password length should be between 8 - 32 characters',
      maxlength: 'Password length should be between 8 - 32 characters',
    },
  };

  onSubmit(): void {
    if (this.form.invalid) { return; }
    const data: SignUpData = this.form.value;
    this.authService.signUp(data).subscribe();
  }

}
