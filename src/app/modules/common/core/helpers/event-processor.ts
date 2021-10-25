import {Observable, OperatorFunction, Subject} from "rxjs";
import {Disposable} from "@common/core";

export class EventProcessor<In, Out = In> {
    private readonly subject = new Subject<In>();
    private readonly disposable = new Disposable();

    public readonly events$: Observable<Out> = this.subject.pipe(
        this.transform,
        this.disposable.takeUntilDisposed()
    );

    constructor(private readonly transform: OperatorFunction<In, Out>) {}

    destroy(): void {
        this.disposable.dispose();
    }

    do(input: In): void {
        this.subject.next(input);
    }
}
