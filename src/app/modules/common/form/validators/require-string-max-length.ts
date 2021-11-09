import { ValidatorFn, Validators } from '@angular/forms';
import { buildValidator } from '@common/form';

export function requireStringMaxLength(max: number, errorMessage?: string): ValidatorFn {
    return buildValidator({
        validate: Validators.maxLength(max),
        message: errorMessage ?? `Cannot be longer than ${max} symbols`
    });
}
