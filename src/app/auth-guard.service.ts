import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {



 constructor(
    private router: Router,
    private dataSharingService: DataSharingService
  ) {

 }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Provjera da li je korisnik autorizovan
    const isUserAuthorized: boolean = this.dataSharingService.getSharedData()?.isAdmin;

    if (isUserAuthorized) {
      return true; // Dozvoli pristup ruti
    } else {
      // Korisnik nije autorizovan, preusmeri na drugu rutu
      return this.router.parseUrl('/unauthorized');
    }
  }
}
