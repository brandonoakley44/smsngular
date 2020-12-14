import { Injectable } from '@angular/core';
import { Router,  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {

  private loggedIn: boolean;

  constructor(private router: Router, private authService: SocialAuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    this.authService.authState.subscribe((user) => {
      this.loggedIn = ( user != null );
    })
    if (this.loggedIn) { return true; }
    this.router.navigate(['/login']);
  }

}
