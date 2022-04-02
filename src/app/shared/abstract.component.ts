import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class AbstractComponent implements OnDestroy {

  protected destoyed$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destoyed$.next();
    this.destoyed$.complete();
  }

}