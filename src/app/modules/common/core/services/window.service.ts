import {Inject, Injectable} from "@angular/core";
import {fromEvent, Observable} from "rxjs";
import {ResizeEvent, ScreenBreakpointEvent} from "@common/core";
import {WindowProvider} from "./window.provider";
import {distinctUntilKeyChanged, map, startWith} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class WindowService {
    public resizeSnapshot!: ResizeEvent;
    public breakpointSnapshot!: ScreenBreakpointEvent;
    public readonly resize$: Observable<ResizeEvent> = this.createResizeStream();
    public readonly breakpoint$: Observable<ScreenBreakpointEvent> = this.createBreakpointStream();

    constructor(
        @Inject(WindowProvider) private readonly window: Window
    ) {
        this.resize$.subscribe(value => this.resizeSnapshot = value);
        this.breakpoint$.subscribe(value => this.breakpointSnapshot = value);
    }

    private createResizeStream(): Observable<ResizeEvent> {
        return fromEvent<UIEvent>(this.window, 'resize').pipe(
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
