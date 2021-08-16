import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {CommonAuthModule, AuthOnlyGuard, InauthOnlyGuard, ActualizeCurrentUserResolver, AuthInterceptor} from "@common/auth";
import {CommonCoreModule} from "@common/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

const routes: Routes = [
    {
        path: 'auth',
        canActivate: [InauthOnlyGuard],
        loadChildren: () => import('./modules/auth').then(m => m.AuthModule)
    },
    {
        path: '',
        canActivate: [AuthOnlyGuard],
        resolve: { currentUser: ActualizeCurrentUserResolver },
        loadChildren: () => import('./modules/dashboard').then(m => m.DashboardModule)
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
export class AppModule {
}
