import {
    Component,
    ElementRef,
    HostBinding,
    HostListener, Inject,
    Input,
    OnDestroy,
    Optional,
    Self,
    ViewChild
} from '@angular/core';
import {MatFormFieldControl} from "@angular/material/form-field";
import {Subject} from "rxjs";
import {Disposable, KeyFactory, NgChanges, TypedOnChanges} from "@common/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {NotifyControlChange, NotifyControlTouched} from "@common/form";
import {BooleanInput} from "ngx-boolean-input";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {IUsersAutocompleteService, USERS_AUTOCOMPLETE_SERVICE} from "../../services";
import {UserInputData} from "../../entities";

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
export class UsersInputComponent implements MatFormFieldControl<UserInputData[]>, OnDestroy, TypedOnChanges, ControlValueAccessor {
    private static readonly CONTROL_TYPE = 'admin-users-input'
    public readonly emailInputSeparators = [ENTER, COMMA, SPACE]
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

    private notifyControlChange!: NotifyControlChange<UserInputData[]>;
    private notifyControlTouched!: NotifyControlTouched;
    private touched: boolean = false;
    private readonly disposable = new Disposable();

    @HostBinding()
    public readonly id = this.keyFactory.nextKey();

    constructor(
        @Optional() @Self()
        public readonly ngControl: NgControl,

        @Inject(USERS_AUTOCOMPLETE_SERVICE)
        private readonly autocompleteService: IUsersAutocompleteService,

        private readonly keyFactory: KeyFactory,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        if (this.ngControl) this.ngControl.valueAccessor = this;
    }

    ngOnChanges(changes: NgChanges<this>) {
        const watchingProps: Array<keyof this> = [
            'value',
            'placeholder',
            'focused',
            'required',
            'disabled'
        ];

        if (watchingProps.some(prop => prop in changes)) {
            this.stateChanges.next();
        }
    }

    public ngOnDestroy() {
        this.stateChanges.complete();
        this.disposable.dispose();
    }

    writeValue(users: UserInputData[]) {
        this.value = users;
    }

    registerOnChange(notifyChange: NotifyControlChange<UserInputData[]>) {
        this.notifyControlChange = notifyChange;
    }

    registerOnTouched(notifyTouched: NotifyControlTouched) {
        this.notifyControlTouched = notifyTouched;
    }

    @HostListener('focusin')
    public onFocusIn() {
        if (!this.focused) this.focused = true;
    }

    @HostListener('focusout', ['$event'])
    public onFocusOut(event: FocusEvent) {
        const focusedElement = event.target as HTMLElement;
        const isInnerFocus = this.elementRef.nativeElement.contains(focusedElement);

        if (!isInnerFocus) {
            this.focused = false;
            this.touched = true;
            this.notifyControlTouched();
        }
    }

    public get empty(): boolean {
        return !!this.value.length;
    }

    @HostBinding('class.floating')
    public get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    public get errorState(): boolean {
        const isInvalid = this.ngControl?.invalid ?? false;
        return isInvalid && this.touched;
    }

    public setDescribedByIds(ids: string[]) {
        this.ariaDescribedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent) {
        const clickedElement = event.target as HTMLElement;
        const emailInputElement = this.emailInputRef.nativeElement;

        if (emailInputElement !== clickedElement) {
            emailInputElement.focus();
        }
    }

    public addUser(email: string): void {
        const isAlreadyAdded = this.value.some(user => user.email.toLowerCase() === email.toLowerCase());

        if (!isAlreadyAdded) {
            this.value.push(new UserInputData(email));
            this.notifyControlChange(this.value);
        }

        this.emailInputRef.nativeElement.value = '';
    }

    public removeUser(email: string): void {
        const userIndex = this.value.findIndex(user => user.email.toLowerCase() === email.toLowerCase())

        if (userIndex >= 0) {
            this.value.splice(userIndex, 1)
            this.notifyControlChange(this.value);
        }
    }

    public loadAutocomplete(query: string): void {
        this.autocompleteService.triggerRequest(query.trim());
    }
}
