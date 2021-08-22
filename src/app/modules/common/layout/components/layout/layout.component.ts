import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {MatDrawerMode} from "@angular/material/sidenav";
import {WindowService} from "@common/core";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
    public readonly sidenavMode$: Observable<MatDrawerMode> = this.createSidenavModeStream();
    public isSidenavOpened: boolean = this.getInitialSidenavState();

    constructor(private readonly windowService: WindowService) {}

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
