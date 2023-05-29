import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter, takeUntil, tap } from 'rxjs';

import { AbstractComponent } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent extends AbstractComponent implements OnInit {
  showHeader: boolean = true;
  hideHeaderForPaths: string[] = ['/login', '/signup'];

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        tap((e: NavigationEnd) => (this.showHeader = !this.hideHeaderForPaths.includes(e.url))),
        takeUntil(this.destroyed$),
      )
      .subscribe();
  }
}
