import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuardService implements CanActivate {

  constructor(private router: Router) {
    
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Provjera da li je korisnik prijavljen
    const isLogged: boolean = true; //TODO Provjerava se preko mreze, pomocu tokena
    
    if (isLogged) {
      return true; // Dozvoli pristup ruti
    } else {
      // Korisnik nije autorizovan, preusmjeri na drugu rutu
      return this.router.parseUrl('/unauthorized');
    }
  }
}
