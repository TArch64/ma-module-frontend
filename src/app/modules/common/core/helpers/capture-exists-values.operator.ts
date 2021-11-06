import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

export function captureExistsValues<T>(source: Observable<T>): Observable<NonNullable<T>> {
    return source.pipe(
        filter(value => !!value),
        map(value => value!)
    );
}
