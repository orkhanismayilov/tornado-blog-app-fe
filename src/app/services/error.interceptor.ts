import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { SnackbarService } from './snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private snackbarService: SnackbarService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        this.loaderService.isLoading$.next(false);
        this.snackbarService.open(err.error.message ?? 'Unknown error', true, { duration: null });
        return of(null);
      }),
    );
  }

}
