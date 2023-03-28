import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormErrors } from 'src/app/shared/interfaces/form-errors.interface';

import { AbstractAuthComponent } from '../abstract/abstract-auth-component';
import { Fieldsets } from '../interfaces/fieldsets';
import { SignUpData } from '../interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    '../abstract/abstract-auth-component.less',
    './signup.component.less',
  ],
})
export class SignupComponent extends AbstractAuthComponent {
  fieldsets: Fieldsets = {
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', this.emailValidators],
    password: ['', this.passwordValidators],
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
    if (this.form.invalid || this.loaderService.isLoading$.value) {
      return;
    }
    this.loaderService.isLoading$.next(true);

    const data: SignUpData = this.form.value;
    this.authService.signUp(data).subscribe(() => {
      this.loaderService.isLoading$.next(false);
      this.router.navigate(['/login']);
    });
  }
}
