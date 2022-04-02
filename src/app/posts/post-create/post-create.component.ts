import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { PostsService } from 'src/app/services/posts.service';

import { Post } from '../interfaces/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.less']
})
export class PostCreateComponent implements OnInit {

  form: FormGroup;
  @ViewChild('postForm') postForm: NgForm;

  private get validators() {
    return [Validators.required, Validators.minLength(3)];
  }

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', this.validators],
      content: ['', this.validators],
    });
  }

  addPost(): void {
    if (this.form.invalid) return;
    const post: Post = {
      title: this.form.value.title,
      content: this.form.value.content,
    };
    this.postsService.addPost(post);
    this.resetForm();
  }

  private resetForm(): void {
    this.postForm.resetForm();
  }
}
