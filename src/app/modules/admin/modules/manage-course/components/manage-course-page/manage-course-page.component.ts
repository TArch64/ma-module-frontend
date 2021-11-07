import { Component } from '@angular/core';
import { ManageCourseFacade } from '../../manage-course.facade';
import { DynamicToolbarService } from '../../services';

interface ITabLink {
    title: string;
    path: Array<string | number>;
}

@Component({
    selector: 'app-manage-course-page',
    templateUrl: './manage-course-page.component.html',
    styleUrls: ['./manage-course-page.component.css']
})
export class ManageCoursePageComponent {
    public toolbarActionsPortal$ = this.dynamicToolbarService.portal$;
    public readonly course = this.facade.course!;

    public readonly links: ITabLink[] = [
        this.buildTabLink('Mentors', 'mentors'),
        this.buildTabLink('Students', 'students')
    ];

    constructor(
        private readonly facade: ManageCourseFacade,
        private readonly dynamicToolbarService: DynamicToolbarService
    ) {}

    private buildTabLink(title: string, tabPath: string): ITabLink {
        return {
            title,
            path: ['/admin', 'courses', this.course.id, tabPath]
        };
    }
}
