import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree,Router, CanActivateFn, GuardResult, MaybeAsync } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class validaruserGuard implements CanActivate{

  id_user: any;
  

  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (typeof window !== 'undefined') {
        this.id_user = sessionStorage.getItem('id');
        if (this.id_user == null || this.id_user == "") {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      } else {
        // Si no estamos en un entorno con `window`, redirigir al usuario al login
        this.router.navigate(['login']);
        return false;
     /* this.id_user = sessionStorage.getItem('id');

      if(this.id_user==null || this.id_user== ""){
        this.router.navigate(['login']);
        return false;
      }
      return true;*/
  }
}
}
