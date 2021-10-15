import { formatValidationHttpResponse } from './format-validation-http-response';
import {throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

const createHttpError = (error: object) => {
    return new HttpErrorResponse({
        url: 'test',
        status: 401,
        statusText: 'opps',
        error
    });
}

describe('format error', () => {
    test('should ignore not http error', (done) => {
        throwError(new Error('test')).pipe(formatValidationHttpResponse).subscribe({
            error: error => {
                expect(error).toMatchSnapshot();
                done();
            }
        });
    });

    test('should ignore not validation error', (done) => {
        const error = createHttpError({type: 'AUTH'});

        throwError(error).pipe(formatValidationHttpResponse).subscribe({
            error: error => {
                expect(error).toMatchSnapshot();
                done();
            }
        });
    });

    test('should format validation error', (done) => {
        const error = createHttpError({
            type: 'VALIDATION',
            message: 'Test error'
        });

        throwError(error).pipe(formatValidationHttpResponse).subscribe({
            error: error => {
                expect(error).toMatchSnapshot();
                done();
            }
        });
    });
});
