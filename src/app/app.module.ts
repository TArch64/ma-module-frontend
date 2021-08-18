import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {
    CommonAuthModule,
    AuthOnlyGuard,
    InauthOnlyGuard,
    AuthInterceptor,
    RoleAccessGuard
} from "@common/auth";
import {CommonCoreModule} from "@common/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UserRoles} from "@common/auth/enums";

const routes: Routes = [
    {
        path: 'auth',
        canActivate: [InauthOnlyGuard],
        loadChildren: () => import('./modules/auth').then(m => m.AuthModule)
    },
    {
        path: '',
        canActivate: [AuthOnlyGuard],
        children: [
            {
                path: 'admin',
                canActivate: [RoleAccessGuard],
                data: { requireRole: UserRoles.ADMIN },
                loadChildren: () => import('./modules/admin').then(m => m.AdminModule)
            },
            {
                path: 'mentor',
                canActivate: [RoleAccessGuard],
                data: { requireRole: UserRoles.MENTOR },
                loadChildren: () => import('./modules/mentor').then(m => m.MentorModule)
            },
            {
                path: '',
                canActivate: [RoleAccessGuard],
                data: { requireRole: UserRoles.STUDENT },
                loadChildren: () => import('./modules/student').then(m => m.StudentModule)
            }
        ]
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, {useHash: false}),
        CommonCoreModule,
        CommonAuthModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
