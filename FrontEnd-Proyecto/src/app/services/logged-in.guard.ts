import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {


  constructor(private router: Router){}

  redirect(flag: boolean): any{
    if(!flag){
      this.router.navigate(['/login']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged = localStorage.getItem("user");
    if(logged == null){
      this.redirect(false);
      return false
    }
    return true;
  }
  
}
