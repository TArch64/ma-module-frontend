import {Subject} from "rxjs";
import {toArray} from "rxjs/operators";
import { Disposable } from './disposable';

describe('take until disposed', () => {
    test('should take events until disposed', (done) => {
        const disposable = new Disposable();
        const subject = new Subject();

        subject.pipe(disposable.takeUntilDisposed(), toArray()).subscribe({
            next: values => expect(values).toMatchSnapshot(),
            complete: () => done()
        });

        subject.next('first');
        subject.next('second');
        disposable.dispose();
        subject.next('ignored');
    });
});

describe('subscribe to', () => {
    test('should subscribe until disposed', (done) => {
        const disposable = new Disposable();
        const subject = new Subject<string>();
        const values: string[] = [];

        disposable.subscribeTo(subject, {
            next: value => values.push(value),

            complete() {
                expect(values).toMatchSnapshot();
                done();
            }
        });

        subject.next('first');
        subject.next('second');
        disposable.dispose();
        subject.next('ignored');
    });

    test('should subscribe until disposed via next callback', (done) => {
        const disposable = new Disposable();
        const subject = new Subject<string>();
        const values: string[] = [];

        disposable.subscribeTo(subject, value => values.push(value));

        disposable.subscribeTo(subject, {
            complete() {
                expect(values).toMatchSnapshot();
                done();
            }
        })

        subject.next('first');
        subject.next('second');
        disposable.dispose();
        subject.next('ignored');
    });
});
