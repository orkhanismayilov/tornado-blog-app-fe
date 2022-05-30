import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { HeaderComponent } from '../header/header.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SnackbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
  ],
  exports: [HeaderComponent],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        verticalPosition: 'top',
        panelClass: 'snackbar-container',
      },
    },
  ],
})
export class SharedModule { }
