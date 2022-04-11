import { AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable, Observer, of } from 'rxjs';

export const mimeTipeValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
  if (control.value instanceof File) {
    const file: File = control.value;
    const fileReader = new FileReader();
    let isValid = false;
    const fr$ = new Observable((observer: Observer<{ [key: string]: any; }>) => {
      fileReader.addEventListener('loadend', () => {
        const array = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        let header = '';
        for (let i = 0; i < array.length; i++) {
          header += array[i].toString(16);
        }
        switch (header) {
          case '89504e47':
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
          case 'ffd8ffe8':
            isValid = true;
            break;
          default:
            isValid = false;
            break;
        }
        isValid ? observer.next(null) : observer.next({ mimeType: true });
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    });

    return fr$;
  }
  return of(null);
}