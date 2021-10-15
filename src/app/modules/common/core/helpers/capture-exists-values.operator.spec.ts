import {of} from "rxjs";
import {toArray} from "rxjs/operators";
import {captureExistsValues} from "./capture-exists-values.operator";

describe('capture exists values', () => {
    test('should capture exists value', async () => {
        const values = await of(123, 'test', {}, []).pipe(captureExistsValues, toArray()).toPromise();
        expect(values).toMatchSnapshot();
    });

    test('should ignore null', async () => {
        const values = await of(123, null).pipe(captureExistsValues, toArray()).toPromise();
        expect(values).toMatchSnapshot();
    });

    test('should ignore undefined', async () => {
        const values = await of(123, undefined).pipe(captureExistsValues, toArray()).toPromise();
        expect(values).toMatchSnapshot();
    });

    test('should not ignore empty string', async () => {
        const values = await of(123, '').pipe(captureExistsValues, toArray()).toPromise();
        expect(values).toMatchSnapshot();
    });

    test('should not ignore false', async () => {
        const values = await of(123, false).pipe(captureExistsValues, toArray()).toPromise();
        expect(values).toMatchSnapshot();
    });
});
