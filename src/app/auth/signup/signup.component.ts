import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { FormErrors } from '@tba/shared';

import { AbstractAuthComponent } from '../abstract/abstract-auth-component';
import { Fieldsets, SignUpData } from '../interfaces';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../abstract/abstract-auth-component.less', './signup.component.less'],
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    MatProgressSpinnerModule,
    AsyncPipe,
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
    if (this.form.invalid || this.loaderService.isLoading) {
      return;
    }
    this.loaderService.isLoading = true;

    const data: SignUpData = this.form.value;
    this.authService.signUp(data).subscribe(() => {
      this.loaderService.isLoading = false;
      this.router.navigate(['/login']);
    });
  }
}
