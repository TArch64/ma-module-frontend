import { AbstractControl, ValidatorFn } from '@angular/forms';

export interface IBuildValidatorOptions {
    message: string;
    validate: ValidatorFn;
}


export function buildValidator(options: IBuildValidatorOptions): ValidatorFn {
    return (control: AbstractControl) => {
        const validationResult = options.validate(control);
        if (!validationResult) return null;
        return { ...validationResult, message: options.message };
    };
}
