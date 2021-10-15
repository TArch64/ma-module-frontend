import {ScreenBreakpoints} from "../enums";

export class ScreenBreakpointEvent {
    private static readonly MOBILE_BREAKPOINT = 600;
    private static readonly TABLET_BREAKPOINT = 1200;

    public readonly breakpoint = this.matchBreakpoint();
    public readonly isMobile = this.isBreakpoint(ScreenBreakpoints.MOBILE);
    public readonly isTablet = this.isBreakpoint(ScreenBreakpoints.TABLET);
    public readonly isDesktop = this.isBreakpoint(ScreenBreakpoints.DESKTOP);

    constructor(public readonly windowWidth: number) {}

    private matchBreakpoint(): ScreenBreakpoints {
        if (this.windowWidth < ScreenBreakpointEvent.MOBILE_BREAKPOINT) {
            return ScreenBreakpoints.MOBILE
        }
        if (this.windowWidth < ScreenBreakpointEvent.TABLET_BREAKPOINT) {
            return ScreenBreakpoints.TABLET;
        }
        return ScreenBreakpoints.DESKTOP;
    }

    public isBreakpoint(breakpoint: ScreenBreakpoints): boolean {
        return this.breakpoint === breakpoint;
    }
}
