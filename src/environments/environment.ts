import { IEnvironment } from './environment.interface';

import 'zone.js/plugins/zone-error';

export const environment: IEnvironment = {
    production: false,
    apiUrl: 'http://localhost:8080'
};
