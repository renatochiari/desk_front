import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SecurityUtil } from "../util/security.util";

@Injectable()
export class AuthorizedGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        const usuario = SecurityUtil.get();
        if (!usuario || !usuario.token) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}