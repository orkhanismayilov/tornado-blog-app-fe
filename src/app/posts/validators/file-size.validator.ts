import { AbstractControl, ValidationErrors } from '@angular/forms';
import { environment as env } from '@tba/env';

export const fileSizeValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!(control.value instanceof File)) {
    return null;
  }

  const file: File = control.value;
  const maxFileSize = env.maxFileSize * Math.pow(1024, 2); // MB

  if (file.size > maxFileSize) {
    return { fileSize: true };
  }

  return null;
};
