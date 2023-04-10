import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [NotFoundComponent, SnackbarComponent, ConfirmDialogComponent, SafePipe],
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  exports: [SafePipe],
})
export class SharedModule {}
