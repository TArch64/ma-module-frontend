import { ValidatorFn, Validators } from '@angular/forms';
import { buildValidator } from '@common/form';

export function requireStringMask(mask: RegExp, errorMessage: string): ValidatorFn {
    return buildValidator({
        validate: Validators.pattern(mask),
        message: errorMessage
    });
}
