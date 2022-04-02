import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { AbstractComponent } from 'src/app/shared/abstract.component';

import { Post } from '../interfaces/post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less']
})
export class PostsListComponent extends AbstractComponent implements OnInit {

  private _posts: Post[];
  get posts(): Post[] {
    return this._posts;
  }

  constructor(private postsService: PostsService) {
    super();
  }

  ngOnInit(): void {
    this.postsService.posts$.pipe(
      takeUntil(this.destoyed$),
    ).subscribe(postsList => this._posts = postsList);
  }

}
