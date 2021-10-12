import {ValidatorFn} from "@angular/forms";
import {buildValidator} from "@common/form";

export function requireArrayLength(length: number, message: string): ValidatorFn {
    return buildValidator({
        validate: control => {
            if (control.value?.length >= length) return null;
            return { minArrayLength: true };
        },
        message
    });
}