import { Component, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { AbstractComponent } from 'src/app/shared/abstract.component';

import { Post } from '../interfaces/post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less']
})
export class PostsListComponent extends AbstractComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postsService: PostsService) {
    super();
  }

  ngOnInit(): void {
    this.postsService.fetchPosts();
    this.posts$ = this.postsService.posts$.pipe(
      takeUntil(this.destroyed$),
    );
  }

  onDeletePost(id: string) {
    this.postsService.deletePost(id);
  }

}
