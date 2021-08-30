import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

export function formatValidationHttpResponse<T>(source: Observable<T>): Observable<T> {
    return source.pipe(
        catchError((response: Error) => {
            if (!(response instanceof HttpErrorResponse)) return throwError(response);
            if (response.error.type !== 'VALIDATION') return throwError(response);
            return throwError(new Error(response.error.message))
        })
    );
}
