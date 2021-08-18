import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {CommonAuthService} from "@common/auth";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authService: CommonAuthService) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = this.authService.isSignedIn
            ? req.headers.append('Authorization', `Bearer ${this.authService.authToken}`)
            : req.headers
        return next.handle(req.clone({headers})).pipe(
            catchError(this.handleAccessError.bind(this))
        )
    }

    private handleAccessError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 403) {
            this.authService.signOut();
            window.location.reload();
        }
        return EMPTY;
    }
}
