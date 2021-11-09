import { Directive, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
    selector: '[appProcessingForm]'
})
export class ProcessingFormDirective {
    @Input('formGroup')
    public formGroup!: FormGroup;

    @Input('appProcessingForm')
    public set isLoading(isLoading: boolean) {
        if (!this.formGroup) return;
        isLoading ? this.formGroup.disable() : this.formGroup.enable();
    }
}
