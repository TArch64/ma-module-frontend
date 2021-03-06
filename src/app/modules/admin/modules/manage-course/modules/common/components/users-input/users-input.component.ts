import {
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input, OnChanges,
    OnDestroy,
    Optional,
    Self,
    ViewChild
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { Disposable, KeyFactory, NgChanges, TypedOnChanges } from '@common/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { NotifyControlChange, NotifyControlTouched, requireEmail, requireField } from '@common/form';
import { BooleanInput } from 'ngx-boolean-input';
import { COMMA, SPACE } from '@angular/cdk/keycodes';
import { IUsersAutocompleteService, USERS_AUTOCOMPLETE_SERVICE } from '../../services';
import { UserInputData } from '../../entities';

@Component({
    selector: 'app-users-input',
    templateUrl: './users-input.component.html',
    styleUrls: ['./users-input.component.css'],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: UsersInputComponent
        },
        KeyFactory.createProvider(UsersInputComponent.CONTROL_TYPE)
    ]
})
export class UsersInputComponent implements MatFormFieldControl<UserInputData[]>, OnDestroy, OnChanges, TypedOnChanges, ControlValueAccessor {
    private static readonly CONTROL_TYPE = 'admin-users-input';
    public readonly emailInputSeparators = [COMMA, SPACE];
    public stateChanges = new Subject<void>();
    public value: UserInputData[] = [];
    public focused: boolean = false;
    public controlType = UsersInputComponent.CONTROL_TYPE;
    public ariaDescribedBy: string = '';
    public autocompleteUsers$ = this.autocompleteService.users$;

    @Input()
    public placeholder: string = '';

    @Input()
    @BooleanInput()
    public required: boolean = false;

    @Input()
    @BooleanInput()
    public disabled: boolean = false;

    @ViewChild('emailInput')
    public emailInputRef!: ElementRef<HTMLInputElement>;

    public emailControl = new FormControl('', [requireEmail(), requireField()]);

    private notifyControlChange!: NotifyControlChange<UserInputData[]>;
    private notifyControlTouched!: NotifyControlTouched;
    private touched: boolean = false;
    private readonly disposable = new Disposable();

    @HostBinding()
    public readonly id = this.keyFactory.nextKey();

    constructor(
        private readonly keyFactory: KeyFactory,
        private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(USERS_AUTOCOMPLETE_SERVICE)
        private readonly autocompleteService: IUsersAutocompleteService,
        @Optional() @Self()
        public readonly ngControl: NgControl
    ) {
        if (ngControl) ngControl.valueAccessor = this;
    }

    public ngOnChanges(changes: NgChanges<this>): void {
        const watchingProps: Array<keyof this> = ['placeholder', 'required', 'disabled'];

        if (watchingProps.some((prop): boolean => prop in changes)) {
            this.stateChanges.next();
        }

        if ('disabled' in changes) {
            this.disabled ? this.emailControl.disable() : this.emailControl.enable();
        }
    }

    public ngOnDestroy(): void {
        this.stateChanges.complete();
        this.disposable.dispose();
    }

    public writeValue(users: UserInputData[]): void {
        this.value = users;
        this.stateChanges.next();
    }

    public registerOnChange(notifyChange: NotifyControlChange<UserInputData[]>): void {
        this.notifyControlChange = notifyChange;
    }

    public registerOnTouched(notifyTouched: NotifyControlTouched): void {
        this.notifyControlTouched = notifyTouched;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.disabled ? this.emailControl.disable() : this.emailControl.enable();
        this.stateChanges.next();
    }

    @HostListener('focusin')
    public onFocusIn(): void {
        if (this.focused || this.disabled) return;

        this.focused = true;
        this.stateChanges.next();
    }

    @HostListener('focusout', ['$event'])
    public onFocusOut(event: FocusEvent): void {
        const focusedElement = event.relatedTarget as HTMLElement;
        const isInnerFocus = this.elementRef.nativeElement.contains(focusedElement);

        if (!isInnerFocus) {
            this.focused = false;
            this.markAsTouched();
        }
    }

    private markAsTouched(): void {
        this.touched = true;
        this.notifyControlTouched();
        this.stateChanges.next();
    }

    public get empty(): boolean {
        return !this.value.length;
    }

    public get shouldLabelFloat(): boolean {
        return this.focused || !this.empty || !!this.emailControl.value;
    }

    public get errorState(): boolean {
        const isInvalid = this.ngControl?.invalid ?? false;
        return isInvalid && this.touched;
    }

    public setDescribedByIds(ids: string[]): void {
        this.ariaDescribedBy = ids.join(' ');
    }

    public onContainerClick(event: MouseEvent): void {
        const clickedElement = event.target as HTMLElement;
        const emailInputElement = this.emailInputRef.nativeElement;

        if (emailInputElement !== clickedElement) {
            emailInputElement.focus();
        }
    }

    public addUser(email: string): void {
        this.emailControl.setValue(email.trim(), { emitEvent: false });
        this.emailControl.markAsTouched();

        if (this.emailControl.invalid) {
            this.ngControl?.control?.setErrors(this.emailControl.errors);
            this.markAsTouched();
            return;
        }

        const isAlreadyAdded = this.value.some((user): boolean => user.email.toLowerCase() === email.toLowerCase());

        if (!isAlreadyAdded) {
            this.value = [...this.value, new UserInputData(email)];
            this.notifyControlChange(this.value);
            this.stateChanges.next();
        }

        this.emailControl.reset('');
    }

    public removeUser(email: string): void {
        this.value = this.value.filter((user): boolean => user.email.toLowerCase() !== email.toLowerCase());
        this.notifyControlChange(this.value);
        this.stateChanges.next();

        this.autocompleteService.reset();
        this.emailInputRef.nativeElement.focus();
    }

    public updateEmailField(): void {
        this.ngControl?.control?.setErrors(null);
        this.autocompleteService.triggerRequest(this.emailControl.value.trim());
    }
}
