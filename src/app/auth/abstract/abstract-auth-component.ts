import { Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { FormErrors } from 'src/app/shared/interfaces/form-errors.interface';

import { Fieldsets } from '../interfaces/fieldsets';

@Directive()
export abstract class AbstractAuthComponent implements OnInit {
  form: FormGroup;
  protected abstract fieldsets: Fieldsets;
  protected abstract errorsMap: FormErrors;

  protected get emailValidators() {
    return [Validators.required, Validators.email];
  }
  protected get passwordValidators() {
    return [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ];
  }

  constructor(
    private fb: FormBuilder,
    protected authService: AuthService,
    protected router: Router,
    public loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    if (this.fieldsets) {
      this.form = this.fb.group(this.fieldsets);
    }
  }

  abstract onSubmit(): void;

  getErrorMessage(fieldName: string): string {
    const errorKey = Object.keys(this.form.get(fieldName).errors ?? {})[0];
    return this.errorsMap[fieldName][errorKey];
  }
}
