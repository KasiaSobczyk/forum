import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";


@Injectable()
export class RouteGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const isLogged = this.userService.getAuth();
        if (!isLogged) {
            this.router.navigate(['/user/login']);
        }
        return isLogged;
    }

}