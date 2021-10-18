import {of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmService} from './confirm.service';
import {ConfirmResult, IConfirmOptions} from "../entities";

type AfterClosedPayload = ConfirmResult | null;

class MockMatDialog {
    constructor(private afterClosedPayload: AfterClosedPayload) {}

    open() {
        return {
            afterClosed: () => of(this.afterClosedPayload)
        };
    }
}

function createMatDialog(afterClosedPayload: AfterClosedPayload): MockMatDialog {
    return new MockMatDialog(afterClosedPayload);
}

function createService(matDialog: MockMatDialog): ConfirmService {
    return new ConfirmService(matDialog as unknown as MatDialog);
}

const createConfirmOptions = (attrs: Partial<IConfirmOptions> = {}): IConfirmOptions => ({
    text: 'test',
    ...attrs
})

describe('complete', () => {
    test('should complete with accept', async () => {
        const expectedResult = ConfirmResult.createConfirmed(null);
        const matDialog = createMatDialog(expectedResult);
        const service = createService(matDialog);
        const result = await service.open(createConfirmOptions()).toPromise();

        expect(result).toEqual(expectedResult)
    });

    test('should ignore dismiss event', async () => {
        const matDialog = createMatDialog(ConfirmResult.createDeclined());
        const service = createService(matDialog);
        const result = await service.open(createConfirmOptions({ ignoreDismissEvent: true })).toPromise();

        expect(result).toBeFalsy();
    });

    test('should not ignore dismiss event', async () => {
        const expectedResult = ConfirmResult.createDeclined();
        const matDialog = createMatDialog(ConfirmResult.createDeclined());
        const service = createService(matDialog);
        const result = await service.open(createConfirmOptions({ ignoreDismissEvent: false })).toPromise();

        expect(result).toEqual(expectedResult);
    });

    test('should convert backdrop click to dismiss', async () => {
        const matDialog = createMatDialog(null);
        const service = createService(matDialog);
        const result = await service.open(createConfirmOptions({ ignoreDismissEvent: false })).toPromise();

        expect(result?.isConfirmed).toBe(false);
    });
});
