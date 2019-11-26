import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {NavigationStart, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor( private router: Router ) {
    // TODO: clear alert messages on Route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe( event => {
      if (event instanceof NavigationStart) {
        // TODO: only keep for a single route change
        this.keepAfterRouteChange = false;
      } else {
        // TODO: clear alert message
        this.clear();
      }
    })
  }

  getAlerts(): Observable<any> {
    return this.subject.asObservable();
  }

  success( message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });
  }

  error( message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });
  }

  clear() {
    // TODO: clear by calling subject.next() without parameters
    this.subject.next();
  }
}
