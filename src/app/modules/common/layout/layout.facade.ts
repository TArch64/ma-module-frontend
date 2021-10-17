import {Inject, Injectable} from "@angular/core";
import {CommonAuthService, ICommonAuthService, User} from "@common/auth";
import {ProgressBarService} from "./services";
import {Observable} from "rxjs";
import {IWindowService, WindowService} from "@common/core";
import {filter, map, mapTo} from "rxjs/operators";
import {Router} from "@angular/router";

export interface ILayoutFacade {
    progressBarVisibility$: Observable<boolean>;
    currentUser$: Observable<User | null>;
    isMobileSnapshot: boolean;
    isMobile$: Observable<boolean>;
    mobileNavigation$: Observable<null>;

    signOut(): void;
}

@Injectable()
export class LayoutFacade implements ILayoutFacade {
    public readonly progressBarVisibility$ = this.progressBar.loading$;
    public readonly currentUser$ = this.authService.currentUser$;

    public readonly mobileNavigation$ = this.router.events.pipe(
        filter(() => this.isMobileSnapshot),
        mapTo(null)
    );

    constructor(
        @Inject(CommonAuthService)
        private readonly authService: ICommonAuthService,
        private readonly progressBar: ProgressBarService,
        @Inject(WindowService)
        private readonly windowService: IWindowService,
        private readonly router: Router
    ) {}

    public signOut(): void {
        this.authService.signOut();
    }

    public get isMobileSnapshot(): boolean {
        return this.windowService.breakpointSnapshot.isMobile;
    }

    public get isMobile$(): Observable<boolean> {
        return this.windowService.breakpoint$.pipe(
            map(event => event.isMobile)
        )
    }
}
