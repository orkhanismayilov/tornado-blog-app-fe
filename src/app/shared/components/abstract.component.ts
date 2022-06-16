import { Directive, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

@Directive()
export abstract class AbstractComponent implements OnDestroy {
  protected destroyed$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
