import { Pipe, PipeTransform } from '@angular/core';
import {UserRoles} from "@common/auth/enums";

@Pipe({
  name: 'roleTitle'
})
export class RoleTitlePipe implements PipeTransform {
    private static readonly TITLE_MAPPING: Record<UserRoles, string> = {
        [UserRoles.MENTOR]: 'Mentor Module',
        [UserRoles.STUDENT]: 'Student Module',
        [UserRoles.ADMIN]: 'Admin Module'
    };

    public transform(role: UserRoles): string {
        return RoleTitlePipe.TITLE_MAPPING[role];
    }
}
