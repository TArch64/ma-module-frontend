import {By} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confirm-dialog.component";
import {ConfirmOptions} from "../../entities";

class MockMatDialogRef {
    mockClose: jest.SpyInstance<void, []> = jest.spyOn<MockMatDialogRef, 'close'>(this, 'close');

    close(): void {}
}

function createMatDialogRef(): MockMatDialogRef {
    return new MockMatDialogRef();
}

function createComponent(matDialogRef: MockMatDialogRef, options: ConfirmOptions): ComponentFixture<ConfirmDialogComponent> {
    const module = TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule,
            MatButtonModule,
            MatCheckboxModule
        ],
        declarations: [ConfirmDialogComponent],
        providers: [
            {provide: MatDialogRef, useValue: matDialogRef},
            {provide: MAT_DIALOG_DATA, useValue: options}
        ]
    });
    return module.createComponent(ConfirmDialogComponent);
}

describe('rendering', () => {
    test('should render additional action', () => {
        const options = ConfirmOptions.create({
            text: 'test',
            additionalAction: { text: 'test' }
        })
        const fixture = createComponent(createMatDialogRef(), options);
        fixture.detectChanges();
        const actionEl = fixture.debugElement.query(By.css('.confirm-dialog__additional-action'));

        expect(actionEl).toBeTruthy();
    });

    test('should render additional action', () => {
        const options = ConfirmOptions.create({text: 'test'})
        const fixture = createComponent(createMatDialogRef(), options);
        fixture.detectChanges();
        const actionEl = fixture.debugElement.query(By.css('.confirm-dialog__additional-action'));

        expect(actionEl).toBeFalsy()
    });
});

describe('complete', () => {
    test('should complete with confirm', () => {
        const matDialogRef = createMatDialogRef();
        const options = ConfirmOptions.create({text: 'test'})
        const fixture = createComponent(matDialogRef, options);
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('[data-test-selector="confirm"]'));
        buttonEl.triggerEventHandler('click', null);

        expect(matDialogRef.mockClose.mock.calls).toMatchSnapshot();
    });

    test('should complete with decline', () => {
        const matDialogRef = createMatDialogRef();
        const options = ConfirmOptions.create({text: 'test'})
        const fixture = createComponent(matDialogRef, options);
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('[data-test-selector="decline"]'));
        buttonEl.triggerEventHandler('click', null);

        expect(matDialogRef.mockClose.mock.calls).toMatchSnapshot();
    });

    test('should confirm with additional action', () => {
        const matDialogRef = createMatDialogRef();
        const options = ConfirmOptions.create({
            text: 'test',
            additionalAction: { text: 'test' }
        })
        const fixture = createComponent(matDialogRef, options);
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('[data-test-selector="confirm"]'));
        buttonEl.triggerEventHandler('click', null);

        expect(matDialogRef.mockClose.mock.calls).toMatchSnapshot();
    });
});
