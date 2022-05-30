import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import {
  filter,
  interval,
  map,
  Subject,
  Subscription,
  takeUntil,
  tap,
  timeInterval,
} from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

import { SnackbarData } from '../../interfaces/snackbar';

@Component({
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.less'],
})
export class SnackbarComponent implements OnInit, OnDestroy {

  private timer$: Subscription;
  private paused$: Subject<boolean> = new Subject();
  timeElapsed: number = 0;
  progress: number = 0;

  @HostListener('mouseenter') onMouseEnter(): void {
    this.pauseTimer();
  }
  @HostListener('mouseleave') onMouseLeaver(): void {
    this.setTimer();
  }

  constructor(
    private snackbarService: SnackbarService,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) { }

  ngOnInit(): void {
    if (this.data.duration) {
      this.setTimer();
    }
  }

  ngOnDestroy(): void {
    this.timer$?.unsubscribe();
  }

  onClose(): void {
    this.snackbarService.hide();
  }

  private setTimer(): void {
    this.timer$ = interval().pipe(
      timeInterval(),
      map((i) => this.timeElapsed += i.interval),
      tap(_ => this.progress = this.timeElapsed / this.data.duration * 100),
      filter(timePassed => timePassed >= this.data.duration),
      tap(_ => this.onClose()),
      takeUntil(this.paused$),
    ).subscribe();
  }

  private pauseTimer(): void {
    this.paused$.next(true);
  }

}
