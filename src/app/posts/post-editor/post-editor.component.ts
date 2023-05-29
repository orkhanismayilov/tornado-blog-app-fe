import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsApiService } from '@tba/api';
import { environment } from '@tba/env';
import { AuthService, LoaderService, PostsService } from '@tba/services';
import { FormErrors } from '@tba/shared';

import { filter, switchMap, tap } from 'rxjs';

import { Post } from '../interfaces';
import { fileSizeValidator, mimeTipeValidator } from '../validators';

enum Mode {
  CREATE = 'create',
  EDIT = 'edit',
}

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.less'],
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
        tap(() => this.loaderService.isLoading$.next(true)),
        switchMap(paramMap => this.postsApi.getPost(paramMap.get('id'))),
        filter(post => {
          if (post.author.id !== this.authService.userData.id) {
            this.router.navigate(['/404']);
            return false;
          }
          return true;
        }),
        tap(() => this.loaderService.isLoading$.next(false)),
      )
      .subscribe(post => this.setMode(post));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    if (this.mode === Mode.CREATE) {
      this.loaderService.isLoading$.next(true);
      this.postsService.addPost(this.form.value);
    } else {
      this.editingPost = {
        ...this.editingPost,
        ...this.form.value,
      };
      this.loaderService.isLoading$.next(true);
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
