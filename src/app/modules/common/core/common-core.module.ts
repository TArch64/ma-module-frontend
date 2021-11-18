import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonAuthService } from '@common/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiPathService, SerializerService } from './services';
import { ButtonLoaderComponent, SquareComponent } from './components';
import { JoinPipe, PluralizePipe, RoleTitlePipe } from './pipes';
import { MatMenuOverlayClassDirective, MatLoadingButtonDirective, MatDisabledButtonDirective } from './directives';

const publicDeclarations = [
    SquareComponent,
    RoleTitlePipe,
    PluralizePipe,
    JoinPipe,
    MatMenuOverlayClassDirective,
    MatLoadingButtonDirective,
    MatDisabledButtonDirective
];

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    providers: [
        SerializerService,
        ApiPathService
    ],
    declarations: [
        ...publicDeclarations,
        ButtonLoaderComponent
    ],
    exports: publicDeclarations
})
export class CommonCoreModule {
    constructor(authService: CommonAuthService, apiPathService: ApiPathService) {
        // Use setter injection to avoid circular dependency
        apiPathService.setAuthService(authService);
    }
}
