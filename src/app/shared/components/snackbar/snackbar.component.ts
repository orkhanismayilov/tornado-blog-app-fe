import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { SnackbarService } from 'src/app/services/snackbar.service';

import { SnackbarData } from '../../interfaces/snackbar';

@Component({
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.less'],
})
export class SnackbarComponent {

  constructor(
    private snackbarService: SnackbarService,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) { }

  onClose(): void {
    this.snackbarService.hide();
  }

}
