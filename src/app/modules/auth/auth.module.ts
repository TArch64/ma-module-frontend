import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SignInPageComponent} from "./components";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
            {path: 'sign-in', component: SignInPageComponent}
        ])
    ],
    declarations: [
        SignInPageComponent
    ]
})
export class AuthModule {
}
