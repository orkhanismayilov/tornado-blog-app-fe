import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShareModule } from 'ngx-sharebuttons';

import { AngularMaterialModule } from '../angular-material.module';
import { ImagePickerComponent } from '../image-picker/image-picker.component';
import { SharedModule } from '../shared/shared.module';
import { PostDatePipe } from './pipes/post-date.pipe';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostComponent } from './post/post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ExcerptPipe } from './pipes/excerpt.pipe';

@NgModule({
  declarations: [PostsListComponent, PostCreateComponent, ImagePickerComponent, PostDatePipe, PostComponent, ExcerptPipe],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule, RouterModule, SharedModule, ShareModule],
})
export class PostsModule {}
