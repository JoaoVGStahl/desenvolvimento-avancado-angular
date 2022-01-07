import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanLoad, CanActivate{

    user = {admin : true, logged: true}

    canLoad() : boolean{
        return this.user.admin;
    }

    canActivate(): boolean{
        return this.user.logged;
    }
}