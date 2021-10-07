import {Observable} from "rxjs";
import {UserInputData} from "../entities";
import {InjectionToken} from "@angular/core";

export const USERS_AUTOCOMPLETE_SERVICE = new InjectionToken('USERS_AUTOCOMPLETE_SERVICE');

export interface IUsersAutocompleteService {
    users$: Observable<UserInputData[]>;
    triggerRequest(query: string): void;
    reset(): void;
}
