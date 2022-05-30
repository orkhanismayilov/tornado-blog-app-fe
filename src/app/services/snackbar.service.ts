import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { SnackbarData } from '../shared/interfaces/snackbar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {

  private snackbarRef: MatSnackBarRef<SnackbarComponent>;

  constructor(private matSnackbar: MatSnackBar) { }

  open(message: string, isError: boolean = true, config?: MatSnackBarConfig<SnackbarData>) {
    this.snackbarRef = this.matSnackbar.openFromComponent(SnackbarComponent, {
      data: {
        isError,
        message,
        duration: 5000,
      },
      ...config,
    });
  }

  hide(): void {
    this.snackbarRef?.dismiss();
  }

}
