import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get isLoading(): boolean {
    return this._isLoading$.value;
  }
  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }
  set isLoading(loading: boolean) {
    this._isLoading$.next(loading);
  }
}
