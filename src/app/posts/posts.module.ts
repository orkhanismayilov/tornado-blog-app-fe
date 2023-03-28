import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { ImagePickerComponent } from '../image-picker/image-picker.component';
import { SharedModule } from '../shared/shared.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    PostsListComponent,
    PostCreateComponent,
    ImagePickerComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
})
export class PostsModule {}
