import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AbstractComponent } from '@tba/shared';

import { filter, takeUntil, tap } from 'rxjs';

import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  standalone: true,
  imports: [NgIf, RouterOutlet, HeaderComponent],
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
