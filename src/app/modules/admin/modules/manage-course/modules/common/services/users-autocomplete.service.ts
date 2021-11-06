import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { UserInputData } from '../entities';

export const USERS_AUTOCOMPLETE_SERVICE = new InjectionToken('USERS_AUTOCOMPLETE_SERVICE');

export interface IUsersAutocompleteService {
    users$: Observable<UserInputData[]>;
    triggerRequest(query: string): void;
    reset(): void;
}
