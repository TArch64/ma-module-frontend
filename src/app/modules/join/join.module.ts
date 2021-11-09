import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonCoreModule } from '@common/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonFormModule } from '@common/form';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from '@common/toastr';
import { CommonAuthModule } from '@common/auth';
import { AcceptFormComponent, JoinPageComponent } from './components';
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
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        CommonCoreModule,
        CommonFormModule,
        CommonAuthModule,
        ToastrModule
    ],
    declarations: [
        JoinPageComponent,
        AcceptFormComponent
    ]
})
export class JoinModule {}
