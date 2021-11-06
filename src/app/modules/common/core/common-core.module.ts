import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonAuthService } from '@common/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiPathService, SerializerService } from './services';
import { ButtonLoaderComponent, SquareComponent } from './components';
import { RoleTitlePipe } from './pipes';
import { MatMenuOverlayClassDirective, MatLoadingButtonDirective } from './directives';

const publicDeclarations = [
    SquareComponent,
    RoleTitlePipe,
    MatMenuOverlayClassDirective,
    MatLoadingButtonDirective
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
