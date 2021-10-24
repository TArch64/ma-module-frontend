import {Inject, Injectable, OnDestroy} from "@angular/core";
import {fromEvent, Observable} from "rxjs";
import {distinctUntilKeyChanged, map, startWith} from "rxjs/operators";
import {Disposable} from "../helpers";
import {ResizeEvent, ScreenBreakpointEvent} from "../entities";
import {IWindow, WindowProvider} from "./window.provider";

export interface IWindowService {
    resizeSnapshot: ResizeEvent;
    resize$: Observable<ResizeEvent>;
    breakpointSnapshot: ScreenBreakpointEvent;
    breakpoint$: Observable<ScreenBreakpointEvent>;
}

@Injectable({ providedIn: 'root' })
export class WindowService implements IWindowService, OnDestroy {
    private readonly disposable = new Disposable();
    public resizeSnapshot!: ResizeEvent;
    public breakpointSnapshot!: ScreenBreakpointEvent;
    public readonly resize$ = this.createResizeStream();
    public readonly breakpoint$ = this.createBreakpointStream();

    constructor(@Inject(WindowProvider) private readonly window: IWindow) {
        this.disposable.subscribeTo(this.resize$, value => this.resizeSnapshot = value);
        this.disposable.subscribeTo(this.breakpoint$, value => this.breakpointSnapshot = value);
    }

    public ngOnDestroy() {
        this.disposable.dispose();
    }

    private createResizeStream(): Observable<ResizeEvent> {
        return fromEvent(this.window, 'resize').pipe(
            startWith(null),
            map(() => new ResizeEvent(this.window.innerWidth, this.window.innerHeight))
        )
    }

    private createBreakpointStream(): Observable<ScreenBreakpointEvent> {
        return this.resize$.pipe(
            map(event => new ScreenBreakpointEvent(event.width)),
            distinctUntilKeyChanged('breakpoint')
        );
    }
}
