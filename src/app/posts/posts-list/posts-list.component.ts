import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { filter, Observable, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostsService } from 'src/app/services/posts.service';
import { AbstractComponent } from 'src/app/shared/components/abstract.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

import { PaginatorConfig } from '../interfaces/paginator.interface';
import { Post } from '../interfaces/post.interface';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less'],
})
export class PostsListComponent extends AbstractComponent implements OnInit {
  posts$: Observable<Post[]>;
  paginatorConfig: PaginatorConfig;
  private dialogRef: MatDialogRef<ConfirmDialogComponent>;

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }
  get userId(): string {
    return this.authService.userData.id;
  }

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private matDialog: MatDialog,
    public loaderService: LoaderService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loaderService.isLoading$.next(true);
    this.postsService.fetchPosts();
    this.posts$ = this.postsService.posts$.pipe(takeUntil(this.destroyed$));
    this.postsService.paginatorConfig$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(config => (this.paginatorConfig = config));
  }

  onDeletePost(id: string) {
    this.dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Post',
        icon: 'warning',
        color: 'warning',
        content: "Are you sure? This action can't be undone.",
        cancelTitle: 'Cancel',
        confirmTitle: 'Delete',
      },
      maxWidth: 270,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.postsService.deletePost(id)),
        takeUntil(this.destroyed$),
      )
      .subscribe();
  }

  onPageNavigate(event: PageEvent) {
    const { pageSize: limit, pageIndex: page } = event;
    this.postsService.fetchPosts(limit, page + 1);
  }
}
