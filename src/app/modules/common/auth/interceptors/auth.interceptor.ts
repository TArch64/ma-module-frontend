import {ClassProvider, Injectable} from "@angular/core";
import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {CommonAuthFacade} from "../common-auth.facade";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public static getProvider(): ClassProvider {
        return {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    }

    constructor(private readonly authFacade: CommonAuthFacade) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = this.authFacade.isSignedIn
            ? req.headers.append('Authorization', `Bearer ${this.authFacade.authToken}`)
            : req.headers
        return next.handle(req.clone({headers})).pipe(
            catchError(this.handleAccessError.bind(this))
        )
    }

    private handleAccessError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 403) this.authFacade.signOut();
        return throwError(error);
    }
}
