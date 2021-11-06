import { Observable, OperatorFunction, Subject, PartialObserver } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type NextOrObserver<T> = PartialObserver<T> | ((value: T) => void);

export class Disposable {
    private subscriptionDisposingTrigger = new Subject<null>();

    public takeUntilDisposed<T>(): OperatorFunction<T, T> {
        return takeUntil<T>(this.subscriptionDisposingTrigger);
    }

    public subscribeTo<T>(observable: Observable<T>, nextOrObserver: NextOrObserver<T>): void {
        const safeObservable = observable.pipe(this.takeUntilDisposed());

        if (typeof nextOrObserver === 'function') {
            safeObservable.subscribe(nextOrObserver);
            return;
        }
        safeObservable.subscribe(nextOrObserver);
    }

    public dispose(): void {
        this.subscriptionDisposingTrigger.next(null);
        this.subscriptionDisposingTrigger.complete();
    }
}
