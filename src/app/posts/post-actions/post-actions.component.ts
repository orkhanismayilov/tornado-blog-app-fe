import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '@tba/services';
import { AbstractComponent, ConfirmDialogComponent } from '@tba/shared';

import { filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.less'],
})
export class PostActionsComponent extends AbstractComponent {
  @Input({ required: true }) postId: string;

  private dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(private matDialog: MatDialog, private postsService: PostsService) {
    super();
  }

  onDeletePost() {
    this.dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Post',
        icon: 'warning',
        color: 'warning',
        content: "Are you sure? This action can't be undone.",
        cancelTitle: 'Cancel',
        confirmTitle: 'Delete',
      },
      maxWidth: 300,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.postsService.deletePost(this.postId)),
        takeUntil(this.destroyed$),
      )
      .subscribe();
  }
}
