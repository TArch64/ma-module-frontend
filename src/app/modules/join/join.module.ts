import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonCoreModule } from '@common/core';
import { JoinPageComponent } from './components';
import { InvitationResolver } from './resolvers';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: JoinPageComponent,
                resolve: { invitation: InvitationResolver }
            }
        ]),
        MatCardModule,
        MatButtonModule,
        CommonCoreModule
    ],
    declarations: [
        JoinPageComponent
    ]
})
export class JoinModule {}
