import {of} from "rxjs";
import {toArray} from "rxjs/operators";
import {captureExistsValues} from "../capture-exists-values.operator";

describe('capture exists values', () => {
    test('should capture exists value', (done) => {
        of(123, 'test', {}, []).pipe(captureExistsValues, toArray()).subscribe(values => {
            expect(values).toMatchSnapshot();
            done();
        });
    });

    test('should ignore null', (done) => {
        of(123, null).pipe(captureExistsValues, toArray()).subscribe(values => {
            expect(values).toMatchSnapshot();
            done();
        });
    });

    test('should ignore undefined', (done) => {
        of(123, undefined).pipe(captureExistsValues, toArray()).subscribe(values => {
            expect(values).toMatchSnapshot();
            done();
        });
    });

    test('should not ignore empty string', (done) => {
        of(123, '').pipe(captureExistsValues, toArray()).subscribe(values => {
            expect(values).toMatchSnapshot();
            done();
        });
    });

    test('should not ignore false', (done) => {
        of(123, false).pipe(captureExistsValues, toArray()).subscribe(values => {
            expect(values).toMatchSnapshot();
            done();
        });
    });
});
