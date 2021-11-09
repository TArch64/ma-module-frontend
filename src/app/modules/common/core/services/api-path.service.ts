import { Inject, Injectable } from '@angular/core';
import { CommonAuthService, UserRoles } from '@common/auth';
import { EnvironmentProvider, IEnvironment } from './environment.provider';

type Path = string | number;

@Injectable()
export class ApiPathService {
    private static readonly ROLE_PATH_MAPPING: Record<UserRoles, string> = {
        [UserRoles.STUDENT]: 'student',
        [UserRoles.MENTOR]: 'mentor',
        [UserRoles.ADMIN]: 'admin'
    };

    private authService!: CommonAuthService;

    constructor(
        @Inject(EnvironmentProvider)
        private readonly environment: IEnvironment
    ) {}

    public setAuthService(authService: CommonAuthService): void {
        this.authService = authService;
    }

    public build(paths: Path[]): string {
        return [
            this.environment.apiUrl,
            ...paths.map((path): string => path.toString())
        ].join('/');
    }

    public buildRolePath(paths: Path[]): string {
        if (!this.authService.currentUser) throw new Error('Current user is not initialized yet');
        const prefix = ApiPathService.ROLE_PATH_MAPPING[this.authService.currentUser.role];
        return this.build([prefix, ...paths]);
    }
}
