import { AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable, Observer, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export const fileSizeValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
  if (!(control.value instanceof File)) {
    return of(null);
  }

  const file: File = control.value;
  const maxFileSize = environment.maxFileSize * Math.pow(1024, 2); // MB
  let isValid = false;

  const fr$ = new Observable((observer: Observer<{ [key: string]: any }>) => {
    if (file.size <= maxFileSize) {
      isValid = true;
    }

    isValid ? observer.next(null) : observer.next({ fileSize: true });
    observer.complete();
  });

  return fr$;
};
