import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { UserService } from "./user.service";
import { Injectable } from "@angular/core";

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const userToken = this.userService.getUserToken();
        const userReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + userToken)
        });

        return next.handle(userReq);
    }
}