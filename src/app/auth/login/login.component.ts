import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { FormErrors } from '@tba/shared';

import { AbstractAuthComponent } from '../abstract/abstract-auth-component';
import { AuthData, Fieldsets } from '../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../abstract/abstract-auth-component.less', './login.component.less'],
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
