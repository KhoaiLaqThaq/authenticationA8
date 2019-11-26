import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../_service/authentication.service";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

/*
 * Error Interceptor to check if there were any errors
 * if there is a 401 Unauthorized response the user is automatically logged out
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor( private authenticationService: AuthenticationService ) {}

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable< HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError( err => {
          if( [401, 403].indexOf(err.status) !== -1 ) {

            // TODO: auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            this.authenticationService.logout();
            location.reload(true);
          }

          const error = err.error.message || err.statusText;

          return throwError(error);
        })
      );
  }
}
