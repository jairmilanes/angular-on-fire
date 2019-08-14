import {Component} from '@angular/core';


@Component({
    selector: 'app-page-not-found',
    template: `
        <div class="aof-page aof-page-not-found"
            fxLayout="row" fxFlexFill fxLayoutAlign="center center">
            <div fxFlex="960px" fxLayout="column" fxLayoutAlign="center center">
                <h2>Ops! Something Went Wrong</h2>
                <p>Sorry but we could not find the page you requested.</p>
            </div>
        </div>
    `,
    styleUrls: ['./not-found.component.scss']
})
export class PageNotFoundComponent {}
