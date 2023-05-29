import { AbstractControl, ValidationErrors } from '@angular/forms';

import { environment } from 'src/environments/environment';

export const fileSizeValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!(control.value instanceof File)) {
    return null;
  }

  const file: File = control.value;
  const maxFileSize = environment.maxFileSize * Math.pow(1024, 2); // MB

  if (file.size > maxFileSize) {
    return { fileSize: true };
  }

  return null;
};
