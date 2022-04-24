import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { filter, switchMap } from 'rxjs';
import { PostsApiService } from 'src/app/api/posts-api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostsService } from 'src/app/services/posts.service';
import { FormErrors } from 'src/app/shared/interfaces/form-errors';

import { Post } from '../interfaces/post';
import { mimeTipeValidator } from '../validators/mime-type.validator';

enum Modes {
  Create = 'create',
  Edit = 'edit',
};

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.less']
})
export class PostCreateComponent implements OnInit {

  Modes = Modes;

  form: FormGroup;

  private errors: FormErrors = {
    title: {
      required: 'Title is required',
      maxLength: 'Enter at least 3 characters',
    },
    content: {
      required: 'Content is required',
      maxLength: 'Enter at least 3 characters',
    },
  };

  mode: Modes = Modes.Create;
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
    public loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, this.validators],
      content: [null, this.validators],
      image: [null, [Validators.required], [mimeTipeValidator]],
    });

    this.route.paramMap.pipe(
      filter(paramMap => paramMap.has('id')),
      switchMap(paramMap => this.postsApi.getPost(paramMap.get('id'))),
    ).subscribe(post => this.setMode(post));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    if (this.mode === Modes.Create) {
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
    const errorKey = Object.keys(this.form.get(fieldName).errors)[0];
    return this.errors[fieldName][errorKey];
  }

  private setMode(post: Post): void {
    if (post) {
      this.mode = Modes.Edit;
      this.editingPost = post;
      this.form.setValue({
        title: post.title,
        image: post.imagePath,
        content: post.content,
      });
      return;
    }
    this.router.navigate(['/create']);
  }

}
