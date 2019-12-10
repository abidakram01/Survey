import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageUpdateService {
  
  private localStorageSource = new Subject<string>();
  public localStorage$ = this.localStorageSource;

  constructor() { }

  onValueChange() {
    this.localStorageSource.next();
  }
}
