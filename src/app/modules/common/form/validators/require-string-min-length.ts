import { ValidatorFn, Validators } from '@angular/forms';
import { buildValidator } from '@common/form';

export function requireStringMinLength(min: number, errorMessage?: string): ValidatorFn {
    return buildValidator({
        validate: Validators.minLength(min),
        message: errorMessage ?? `Should be longer than ${min} symbols`
    });
}
