import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { MisstepComponent } from "./misstep/misstep.component";
import { MisstepService } from "./misstep/misstep.service";

@Injectable()
export class MisstepInterceptor implements HttpInterceptor {

    constructor(private misstepService: MisstepService ,private modal: MatDialog) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                // console.log(error);
                let defaultMessage = 'Wystąpił nieznany błąd';
                if (error.error.message) {
                    defaultMessage = error.error.message;
                }
                this.modal.open(MisstepComponent, { data: { message: defaultMessage } });
                return throwError(error);
            })
        );
    }

}