
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RegisterServiceService } from '../auth-service/registerservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, public registerService: RegisterServiceService){

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean{

    const email = localStorage.getItem("email")
    const token = localStorage.getItem("token")

    const direccion = document.location.href.toString()

   localStorage.setItem("linkdLab", direccion)

    return this.registerService.verifyAdminByEmail(email!).pipe(
       map((user:any) => {

        if(user === null){
          const enlace = document.createElement("a")
          enlace.href = 'https://front-metro-madrid.vercel.app/login'
          enlace.click()
          return false
        }
         if(user.confirmed && user.token === token){
          localStorage.removeItem("linkdLab")
             return true
         }else{
          const enlace = document.createElement("a")
          enlace.href = 'https://front-metro-madrid.vercel.app/login'
          enlace.click()
          return false
         }

       })

     )


  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
