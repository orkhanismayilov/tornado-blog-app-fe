import { Component } from '@angular/core';

import { FormErrors } from 'src/app/shared/interfaces/form-errors';

import { AbstractAuthComponent } from '../abstract-auth-component.spec';
import { Fieldsets } from '../interfaces/fieldsets';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends AbstractAuthComponent {

  fieldsets: Fieldsets = {
    email: [null, this.emailValidators],
    password: [null, this.passwordValidators],
  };

  errorsMap: FormErrors = {
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

  }

}