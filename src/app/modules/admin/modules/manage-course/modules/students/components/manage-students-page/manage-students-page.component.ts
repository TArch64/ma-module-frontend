import { Component, Injector } from '@angular/core';
import { DynamicToolbarService } from '../../../../services';
import { ManageStudentsActionsComponent } from '../manage-students-actions';

@Component({
    selector: 'app-manage-students-page',
    templateUrl: './manage-students-page.component.html'
})
export class ManageStudentsPageComponent {
    constructor(
        private readonly dynamicToolbarService: DynamicToolbarService,
        private readonly injector: Injector
    ) {
        this.dynamicToolbarService.useToolbar(ManageStudentsActionsComponent, this.injector);
    }
}
