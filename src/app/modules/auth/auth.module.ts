import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonAuthModule } from '@common/auth';
import { CommonCoreModule } from '@common/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonFormModule } from '@common/form';
import { ToastrModule } from '@common/toastr';
import { LoginFormComponent, SignInPageComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        CommonCoreModule,
        CommonAuthModule,
        RouterModule.forChild([
            { path: '', component: SignInPageComponent }
        ]),
        CommonFormModule,
        ToastrModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [
        SignInPageComponent,
        LoginFormComponent
    ]
})
export class AuthModule {
}
