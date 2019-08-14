import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WebPageComponent} from './web-page/web-page.component';
import {PageNotFoundComponent} from './web-page/page/not-found/not-found.component';


const routes: Routes = [
    {
        path: '',
        component: WebPageComponent
    },
    {
        path: '*',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
