import { Inject, Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { Disposable, ResizeEvent, ScreenBreakpointEvent } from '@common/core';
import { distinctUntilKeyChanged, map, startWith } from 'rxjs/operators';
import { WindowProvider } from './window.provider';

@Injectable({ providedIn: 'root' })
export class WindowService implements OnDestroy {
    private readonly disposable = new Disposable();
    public resizeSnapshot!: ResizeEvent;
    public breakpointSnapshot!: ScreenBreakpointEvent;
    public readonly resize$: Observable<ResizeEvent> = this.createResizeStream();
    public readonly breakpoint$: Observable<ScreenBreakpointEvent> = this.createBreakpointStream();

    constructor(@Inject(WindowProvider) private readonly window: Window) {
        this.disposable.subscribeTo(this.resize$, (value): void => {
            this.resizeSnapshot = value;
        });
        this.disposable.subscribeTo(this.breakpoint$, (value): void => {
            this.breakpointSnapshot = value;
        });
    }

    public ngOnDestroy(): void {
        this.disposable.dispose();
    }

    private createResizeStream(): Observable<ResizeEvent> {
        return fromEvent<UIEvent>(this.window, 'resize').pipe(
            startWith(null),
            map((): ResizeEvent => new ResizeEvent(this.window.innerWidth, this.window.innerHeight))
        );
    }

    private createBreakpointStream(): Observable<ScreenBreakpointEvent> {
        return this.resize$.pipe(
            map((event): ScreenBreakpointEvent => new ScreenBreakpointEvent(event.width)),
            distinctUntilKeyChanged('breakpoint')
        );
    }
}
