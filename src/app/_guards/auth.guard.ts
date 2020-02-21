import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../_service/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    // TODO: get currentUser info from localStorage
    const currentUser = this.authenticationService.currentUserValue;
    // debugger;
    if ( currentUser ) {
      // TODO: check if route is restricted by role
      if ( route.data.roles && route.data.roles.indexOf( currentUser.role ) === -1 ) {
        // TODO: role not authorised so redirect to home page
        this.router.navigate(['/']).then(r => null);

        return false;
      }
      // TODO: authorised so return true
      return true;
    }

    // TODO: not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
