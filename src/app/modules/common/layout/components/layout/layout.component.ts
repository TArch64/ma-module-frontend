import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MatDrawerMode} from "@angular/material/sidenav";
import {Disposable, WindowService} from "@common/core";
import {filter, map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    private readonly disposable = new Disposable();
    public readonly sidenavMode$: Observable<MatDrawerMode> = this.createSidenavModeStream();
    public isSidenavOpened: boolean = this.getInitialSidenavState();

    constructor(
        private readonly windowService: WindowService,
        private readonly router: Router
    ) {}

    public ngOnInit() {
        const mobileNavigation$ = this.router.events.pipe(
            filter(() => this.windowService.breakpointSnapshot.isMobile)
        )
        this.disposable.subscribeTo(mobileNavigation$, this.closeSidenav.bind(this));
    }

    private createSidenavModeStream(): Observable<MatDrawerMode> {
        return this.windowService.breakpoint$.pipe(
            map(event => event.isMobile ? 'over' : 'side')
        );
    }

    private getInitialSidenavState(): boolean {
        return !this.windowService.breakpointSnapshot.isMobile;
    }

    public toggleSidenav(): void {
        this.isSidenavOpened = !this.isSidenavOpened;
    }

    public closeSidenav(): void {
        this.isSidenavOpened = false;
    }
}
