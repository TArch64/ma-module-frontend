import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginFormComponent, SignInPageComponent} from "./components";
import {AuthFacade} from "./auth.facade";
import {CommonAuthModule} from "@common/auth";
import {CommonCoreModule} from "@common/core";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonFormModule} from "@common/form";
import {ToastrModule} from "@common/toastr";

@NgModule({
    imports: [
        CommonModule,
        CommonCoreModule,
        CommonAuthModule,
        RouterModule.forChild([
            {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
            {path: 'sign-in', component: SignInPageComponent}
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
    ],
    providers: [
        AuthFacade
    ]
})
export class AuthModule {
}
