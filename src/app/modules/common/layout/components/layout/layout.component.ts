import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MatDrawerMode} from "@angular/material/sidenav";
import {Disposable} from "@common/core";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {ILayoutFacade, LayoutFacade} from "@common/layout/layout.facade";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    public static readonly SIDENAV_DESKTOP_BEHAVIOR: MatDrawerMode = 'side';
    public static readonly SIDENAV_MOBILE_BEHAVIOR: MatDrawerMode = 'over';

    private readonly disposable = new Disposable();
    public readonly sidenavMode$: Observable<MatDrawerMode> = this.createSidenavModeStream();
    public readonly isProgressBarVisible$ = this.createProgressBarVisibilityStream();
    public isSidenavOpened: boolean = !this.facade.isMobileSnapshot

    constructor(
        @Inject(LayoutFacade)
        private readonly facade: ILayoutFacade
    ) {}

    public ngOnInit() {
        this.disposable.subscribeTo(this.facade.mobileNavigation$, this.closeSidenav.bind(this));
    }

    private createSidenavModeStream(): Observable<MatDrawerMode> {
        return this.facade.isMobile$.pipe(
            map(isMobile => isMobile
                ? LayoutComponent.SIDENAV_MOBILE_BEHAVIOR
                : LayoutComponent.SIDENAV_DESKTOP_BEHAVIOR
            )
        );
    }

    private createProgressBarVisibilityStream(): Observable<boolean> {
        return this.facade.progressBarVisibility$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
    }

    public toggleSidenav(): void {
        this.isSidenavOpened = !this.isSidenavOpened;
    }

    public closeSidenav(): void {
        this.isSidenavOpened = false;
    }
}
