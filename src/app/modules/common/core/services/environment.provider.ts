import { InjectionToken } from '@angular/core';
import { environment, IEnvironment } from '../../../../../environments';

export const EnvironmentProvider = new InjectionToken<IEnvironment>('environment', {
    providedIn: 'root',
    factory: (): IEnvironment => environment
});

export { IEnvironment };
