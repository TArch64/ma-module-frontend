import {inject, InjectionToken} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {HasEventTargetAddRemove} from "rxjs/src/internal/observable/fromEvent";

interface IWindowLocation {
    reload(): void;
}

export interface IWindow extends HasEventTargetAddRemove<Event> {
    innerWidth: number;
    innerHeight: number;
    location: IWindowLocation;
}

export const WindowProvider = new InjectionToken<IWindow>('window', {
    factory: () => inject(DOCUMENT).defaultView!,
    providedIn: 'root'
});
