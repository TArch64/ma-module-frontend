import {ScreenBreakpoints} from "../../enums";
import {ScreenBreakpointEvent} from "../screen-breakpoint-event";

describe('match breakpoint', () => {
    test('should match mobile', () => {
        const event = new ScreenBreakpointEvent(400);

        expect(event.breakpoint).toEqual(ScreenBreakpoints.MOBILE);
    });

    test('should match tablet', () => {
        const event = new ScreenBreakpointEvent(1000);

        expect(event.breakpoint).toEqual(ScreenBreakpoints.TABLET);
    });

    test('should match desktop', () => {
        const event = new ScreenBreakpointEvent(2000);

        expect(event.breakpoint).toEqual(ScreenBreakpoints.DESKTOP);
    });
});
