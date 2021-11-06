import { ValidatorFn, Validators } from '@angular/forms';
import { buildValidator } from '../helpers';

export function requireField(errorMessage?: string): ValidatorFn {
    return buildValidator({
        validate: Validators.required,
        message: errorMessage ?? 'Please fill out this field'
    });
}
