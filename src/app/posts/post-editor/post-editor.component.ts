import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { filter, switchMap } from 'rxjs';
import { PostsApiService } from 'src/app/api/posts-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostsService } from 'src/app/services/posts.service';
import { FormErrors } from 'src/app/shared/interfaces/form-errors.interface';
import { environment } from 'src/environments/environment';

import { Post } from '../interfaces/post.interface';
import { mimeTipeValidator } from '../validators/mime-type.validator';

enum Mode {
  Create = 'create',
  Edit = 'edit',
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
  };

  mode: Mode = Mode.Create;
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
      image: [null, [Validators.required], [mimeTipeValidator]],
    });

    this.route.paramMap
      .pipe(
        filter(paramMap => paramMap.has('id')),
        switchMap(paramMap => this.postsApi.getPost(paramMap.get('id'))),
        filter(post => {
          if (post.author.id !== this.authService.userData.id) {
            this.router.navigate(['/404']);
            return false;
          }
          return true;
        }),
      )
      .subscribe(post => this.setMode(post));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    if (this.mode === Mode.Create) {
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

  onImagePicked(image: File): void {
    this.form.patchValue({ image });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    const errorKey = Object.keys(control.errors ?? {})[0];
    return control.touched ? this.errorsMap[fieldName][errorKey] : null;
  }

  private setMode(post: Post): void {
    if (post) {
      this.mode = Mode.Edit;
      this.editingPost = post;
      this.form.setValue({
        title: post.title,
        image: post.imagePath,
        content: post.content,
      });
      this.form.markAsPristine();
      this.titleService.setTitle(`Edit Post - ${this.editingPost.title} - ${environment.appName}`);

      return;
    }

    this.router.navigate(['/create']);
  }
}
