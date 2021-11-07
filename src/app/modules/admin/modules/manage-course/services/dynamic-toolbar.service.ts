import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentType } from '@angular/cdk/portal/portal';

@Injectable({ providedIn: 'root' })
export class DynamicToolbarService {
    private readonly portalSubject = new BehaviorSubject<ComponentPortal<unknown> | null>(null);
    public readonly portal$ = this.portalSubject.asObservable();

    public useToolbar(component: ComponentType<unknown>, injector?: Injector): void {
        this.portalSubject.next(new ComponentPortal<unknown>(component, null, injector));
    }

    public removeToolbar(): void {
        this.portalSubject.next(null);
    }
}
