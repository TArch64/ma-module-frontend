import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export function formatValidationHttpResponse<T>(source: Observable<T>): Observable<T> {
    return source.pipe(
        catchError((response: Error): Observable<never> => {
            if (!(response instanceof HttpErrorResponse)) {
                return throwError((): Error => response);
            }
            if (response.error.type !== 'VALIDATION') {
                return throwError((): Error => response);
            }
            return throwError((): Error => new Error(response.error.message));
        })
    );
}
