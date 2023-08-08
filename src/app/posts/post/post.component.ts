import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsApiService } from '@tba/api';
import { environment } from '@tba/env';
import { AuthService, LoaderService } from '@tba/services';

import { ShareModule } from 'ngx-sharebuttons';
import { filter, Observable, switchMap, tap } from 'rxjs';

import { SafePipe } from '../../shared/pipes/safe.pipe';
import { Post } from '../interfaces';
import { ExcerptPipe } from '../pipes';
import { PostActionsComponent } from '../post-actions/post-actions.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less'],
  providers: [ExcerptPipe],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ShareModule,
    MatIconModule,
    PostActionsComponent,
    RouterLink,
    MatProgressSpinnerModule,
    AsyncPipe,
    DatePipe,
    SafePipe,
  ],
})
export class PostComponent implements OnInit {
  post: Post;
  socialIcons = ['facebook', 'twitter', 'telegram', 'whatsapp'];

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }
  get userId(): string {
    return this.authService.userData.id;
  }

  constructor(
    private route: ActivatedRoute,
    private postsApi: PostsApiService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private metaService: Meta,
    private excerptPipe: ExcerptPipe,
    private authService: AuthService,
    public loaderService: LoaderService,
  ) {
    for (const icon of this.socialIcons) {
      this.iconRegistry.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/${icon}.svg`),
      );
    }
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter(paramMap => paramMap.has('id')),
        switchMap(paramMap => {
          this.loaderService.isLoading = true;
          return this.postsApi.getPost(paramMap.get('id'), 5);
        }),
        tap(post => {
          this.post = post;
          this.titleService.setTitle(`${this.post.title} - ${environment.appName}`);
          this.addTags();

          this.loaderService.isLoading = false;
        }),
      )
      .subscribe();
  }

  private addTags(): void {
    this.metaService.addTags([
      { name: 'robots', property: 'index,follow,max-image-preview:large' },
      { name: 'author', property: this.post.author.fullName },
      {
        name: 'description',
        property: `${this.excerptPipe.transform(this.post.content, 300)}...`,
      },
      { property: 'article:published_time', content: new Date(this.post.createdAt).toISOString() },
      // TODO: Update when author page is implemented
      // { property: 'article:author', content: '' },
    ]);
  }
}
