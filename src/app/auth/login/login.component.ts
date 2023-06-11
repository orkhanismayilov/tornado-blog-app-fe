import { Component } from '@angular/core';
import { FormErrors } from '@tba/shared';

import { AbstractAuthComponent } from '../abstract/abstract-auth-component';
import { AuthData, Fieldsets } from '../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../abstract/abstract-auth-component.less', './login.component.less'],
})
export class LoginComponent extends AbstractAuthComponent {
  fieldsets: Fieldsets = {
    email: ['', this.emailValidators],
    password: ['', this.passwordValidators],
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
    if (this.form.invalid || this.loaderService.isLoading) {
      return;
    }
    this.loaderService.isLoading = true;

    const data: AuthData = this.form.value;
    this.authService.login(data).subscribe(() => {
      this.loaderService.isLoading = false;
      this.router.navigate(['/']);
    });
  }
}
