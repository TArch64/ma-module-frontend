import {DOMWindow, JSDOM} from "jsdom";
import {WindowService} from "../window.service";

const createWindow = (): DOMWindow => new JSDOM().window;

function createService() {
    const window = createWindow();
    const service = new WindowService(window as any as Window);

    return { service, window };
}

function dispatchResizeEvent(window: DOMWindow, width: number): void {
    Object.defineProperty(window, 'innerHeight', { value: 1234 });
    Object.defineProperty(window, 'innerWidth', { value: width });
    window.dispatchEvent(new window.UIEvent('resize'));
}

describe('resize', () => {
    test('should proxy resize event', (done) => {
        const { service, window } = createService();

        dispatchResizeEvent(window, 1234);

        service.resize$.subscribe(event => {
            expect(event).toMatchSnapshot();
            done();
        });
    });

    test('should save event snapshot', () => {
        const { service, window } = createService();

        dispatchResizeEvent(window, 1234);

        expect(service.resizeSnapshot).toMatchSnapshot();
    });
});

describe('breakpoint', () => {
    test('should broadcast breakpoint event', (done) => {
        const { service, window } = createService();

        dispatchResizeEvent(window, 1234);

        service.breakpoint$.subscribe(event => {
            expect(event).toMatchSnapshot();
            done();
        });
    });

    test('should save event snapshot', () => {
        const { service, window } = createService();

        dispatchResizeEvent(window, 1234);

        expect(service.breakpointSnapshot).toMatchSnapshot();
    });
});
