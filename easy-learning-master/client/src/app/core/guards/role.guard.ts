import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const navigateUrl = next.data.roles[0] =='student' ? '/auth/login' : '/service-auth'
      if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const expectedRoles = next.data.roles;
      const tokenPayload = decode(token);
      if (expectedRoles.includes(tokenPayload.role)) {
        return true;
      } else {
        this.router.navigate([navigateUrl]);
        return false
      }
    } else {
      this.router.navigate([navigateUrl]);
      return false
    }
  }

}
