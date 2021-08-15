import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: 'auth', loadChildren: () => import('./modules/auth').then(m => m.AuthModule)},
    {path: '', loadChildren: () => import('./modules/dashboard').then(m => m.DashboardModule)}
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, {useHash: false})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
