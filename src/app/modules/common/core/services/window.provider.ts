import {inject, InjectionToken} from "@angular/core";
import {DOCUMENT} from "@angular/common";

export const WindowProvider = new InjectionToken<Window>('window', {
    factory: () => inject(DOCUMENT).defaultView!,
    providedIn: 'root'
});
