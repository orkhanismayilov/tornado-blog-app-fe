import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { HeaderComponent } from '../header/header.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [HeaderComponent, SnackbarComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
