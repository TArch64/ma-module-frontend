import { ValidatorFn, Validators } from '@angular/forms';
import { buildValidator } from '../helpers';

export function requireEmail(errorMessage?: string): ValidatorFn {
    return buildValidator({
        validate: Validators.email,
        message: errorMessage ?? 'Email is not correct',
    });
}
