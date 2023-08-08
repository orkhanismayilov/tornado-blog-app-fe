import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { QuillModule } from 'ngx-quill';
import { ShareModule } from 'ngx-sharebuttons';

import { AngularMaterialModule } from '../angular-material.module';
import { ImagePickerComponent } from '../image-picker/image-picker.component';
import { SharedModule } from '../shared/shared.module';
import { PostTitleComponent } from './controls';
import { ExcerptPipe, PostDatePipe } from './pipes';
import { PostActionsComponent } from './post-actions/post-actions.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostComponent } from './post/post.component';
import { PostsListComponent } from './posts-list/posts-list.component';

@NgModule({
  declarations: [
    PostsListComponent,
    PostEditorComponent,
    ImagePickerComponent,
    PostDatePipe,
    PostComponent,
    ExcerptPipe,
    PostTitleComponent,
    PostActionsComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ShareModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [2, 3, 4, false] }],
          ['link', 'clean'],
        ],
      },
    }),
  ],
})
export class PostsModule {}
