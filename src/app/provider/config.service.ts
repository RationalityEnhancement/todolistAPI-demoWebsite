import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Configuration } from '../interfaces/Configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configuration$ = new ReplaySubject<Configuration>();

  constructor() { }

  public setConfiguration(configuration: Configuration) {
    this.configuration$.next(configuration);
  }

  public getConfiguration(): Observable<Configuration> {
    return this.configuration$
      .pipe(
        filter(configuration => !!configuration),
        take(1)
      );
  }
}
