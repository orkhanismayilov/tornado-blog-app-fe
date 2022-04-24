import { Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrors } from '../shared/interfaces/form-errors';

import { Fieldsets } from './interfaces/fieldsets';

@Directive()
export abstract class AbstractAuthComponent implements OnInit {

  form: FormGroup;
  protected abstract fieldsets: Fieldsets;
  protected abstract errorsMap: FormErrors;

  protected get emailValidators() {
    return [
      Validators.required,
      Validators.email,
    ];
  }
  protected get passwordValidators() {
    return [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ];
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.fieldsets) {
      this.form = this.fb.group(this.fieldsets);
    }
  }

  abstract onSubmit(): void;

  getErrorMessage(fieldName: string): string {
    const errorKey = Object.keys(this.form.get(fieldName).errors)[0];
    return this.errorsMap[fieldName][errorKey];
  }

}