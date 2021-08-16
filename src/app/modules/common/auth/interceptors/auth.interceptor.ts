import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonAuthService} from "@common/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authService: CommonAuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = this.authService.isSignedIn
            ? req.headers.append('Authorization', `Bearer ${this.authService.authToken}`)
            : req.headers
        return next.handle(req.clone({headers}))
    }
}
