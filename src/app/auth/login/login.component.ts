import { Component } from '@angular/core';

import { FormErrors } from 'src/app/shared/interfaces/form-errors';

import { AbstractAuthComponent } from '../abstract/abstract-auth-component.spec';
import { Fieldsets } from '../interfaces/fieldsets';
import { AuthData } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../abstract/abstract-auth-component.less',
    './login.component.less'
  ]
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
    if (this.form.invalid) { return; }
    const data: AuthData = this.form.value;
    this.authService.login(data).subscribe(() => this.router.navigate(['/']));
  }

}
