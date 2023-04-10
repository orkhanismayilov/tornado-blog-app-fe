import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { filter, switchMap, tap } from 'rxjs';
import { PostsApiService } from 'src/app/api/posts-api.service';
import { LoaderService } from 'src/app/services/loader.service';

import { Post } from '../interfaces/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less'],
})
export class PostComponent implements OnInit {
  post: Post;
  socialIcons = ['facebook', 'twitter', 'telegram', 'whatsapp'];

  constructor(
    private route: ActivatedRoute,
    private postsApi: PostsApiService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
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
          this.loaderService.isLoading$.next(true);
          return this.postsApi.getPost(paramMap.get('id'), 5);
        }),
        tap(post => {
          this.post = post;
          this.loaderService.isLoading$.next(false);
        }),
      )
      .subscribe();
  }
}
