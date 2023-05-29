import { AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable, Observer, of } from 'rxjs';

export const mimeTipeValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
  if (!(control.value instanceof File)) {
    return of(null);
  }

  const file: File = control.value;
  const fileReader = new FileReader();
  const validHeaders = [
    '89504e47', // PNG
    'ffd8ffe0', // JPEG
    'ffd8ffe1',
    'ffd8ffe2',
    'ffd8ffe3',
    'ffd8ffe8',
    '52494646', // WEBP
    '3c737667', // SVG
  ];
  let isValid = false;

  const fr$ = new Observable((observer: Observer<{ [key: string]: any }>) => {
    fileReader.addEventListener('loadend', () => {
      const array = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      for (let i = 0; i < array.length; i++) {
        header += array[i].toString(16);
      }

      if (validHeaders.includes(header)) {
        isValid = true;
      }

      isValid ? observer.next(null) : observer.next({ mimeType: true });
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });

  return fr$;
};
