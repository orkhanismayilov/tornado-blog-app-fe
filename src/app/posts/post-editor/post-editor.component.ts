import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsApiService } from '@tba/api';
import { environment } from '@tba/env';
import { AuthService, LoaderService, PostsService } from '@tba/services';
import { FormErrors } from '@tba/shared';

import { QuillEditorComponent } from 'ngx-quill';
import { filter, switchMap, tap } from 'rxjs';

import { ImagePickerComponent } from '../../image-picker/image-picker.component';
import { PostTitleComponent } from '../controls/post-title/post-title.component';
import { Post } from '../interfaces';
import { fileSizeValidator, mimeTipeValidator } from '../validators';

enum Mode {
  CREATE,
  EDIT,
}

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.less'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    ImagePickerComponent,
    MatFormFieldModule,
    PostTitleComponent,
    QuillEditorComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
})
export class PostEditorComponent implements OnInit {
  Mode = Mode;
  form: FormGroup;

  private errorsMap: FormErrors = {
    title: {
      required: 'Title is required',
      minlength: 'Enter at least 3 characters',
    },
    content: {
      required: 'Content is required',
      minLengthError: 'Enter at least 3 characters',
    },
    image: {
      required: 'Title image is required',
      mimeType: 'Invalid file type! Only png, jpg, jpeg, webp, svg are allowed.',
      fileSize: 'Maximum allowed file size is 10MB',
    },
  };

  mode: Mode = Mode.CREATE;
  editingPost: Post;

  private get validators() {
    return [Validators.required, Validators.minLength(3)];
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private postsApi: PostsApiService,
    private authService: AuthService,
    private titleService: Title,
    public loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', this.validators],
      content: ['', this.validators],
      image: [null, [Validators.required, fileSizeValidator], [mimeTipeValidator]],
    });

    this.route.paramMap
      .pipe(
        filter(paramMap => paramMap.has('id')),
        tap(() => (this.loaderService.isLoading = true)),
        switchMap(paramMap => this.postsApi.getPost(paramMap.get('id'))),
        filter(post => {
          if (post.author.id !== this.authService.userData.id) {
            this.router.navigate(['/404']);
            return false;
          }
          return true;
        }),
        tap(() => (this.loaderService.isLoading = false)),
      )
      .subscribe(post => this.setMode(post));
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.mode === Mode.CREATE) {
      this.loaderService.isLoading = true;
      this.postsService.addPost(this.form.value);
    } else {
      this.editingPost = {
        ...this.editingPost,
        ...this.form.value,
      };
      this.loaderService.isLoading = true;
      this.postsService.patchPost(this.editingPost);
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    const errorKey = Object.keys(control.errors ?? {})[0];
    return control.touched ? this.errorsMap[fieldName]?.[errorKey] : null;
  }

  private setMode(post: Post): void {
    if (post) {
      this.mode = Mode.EDIT;
      this.editingPost = post;
      this.form.setValue(
        {
          title: post.title,
          image: post.imagePath,
          content: post.content,
        },
        { emitEvent: false },
      );
      this.titleService.setTitle(`Edit Post - ${this.editingPost.title} - ${environment.appName}`);

      return;
    }

    this.router.navigate(['/create']);
  }
}
