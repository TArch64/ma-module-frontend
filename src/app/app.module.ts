import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CommonCoreModule } from '@common/core';
import { CommonAuthModule, AuthOnlyGuard, InauthOnlyGuard, RoleAccessGuard, UserRoles } from '@common/auth';
import { CommonSeasonModule, LoadSeasonsResolver } from '@common/season';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: 'auth',
        canActivate: [InauthOnlyGuard],
        loadChildren: () => import('./modules/auth').then((m) => m.AuthModule)
    },
    {
        path: '',
        canActivate: [AuthOnlyGuard],
        children: [
            {
                path: 'admin',
                canActivate: [RoleAccessGuard],
                resolve: { seasons: LoadSeasonsResolver },
                data: { requireRole: UserRoles.ADMIN },
                loadChildren: () => import('./modules/admin').then((m) => m.AdminModule)
            },
            {
                path: 'mentor',
                canActivate: [RoleAccessGuard],
                resolve: { seasons: LoadSeasonsResolver },
                data: { requireRole: UserRoles.MENTOR },
                loadChildren: () => import('./modules/mentor').then((m) => m.MentorModule)
            },
            {
                path: '',
                canActivate: [RoleAccessGuard],
                data: { requireRole: UserRoles.STUDENT },
                loadChildren: () => import('./modules/student').then((m) => m.StudentModule)
            },
            {
                path: '**',
                redirectTo: '/'
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
        RouterModule.forRoot(routes, { useHash: false }),
        CommonCoreModule,
        CommonAuthModule,
        CommonSeasonModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
