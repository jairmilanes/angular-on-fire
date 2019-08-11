import {Component, Input} from '@angular/core';


@Component({
    selector: 'app-content-section',
    template: `
        <section class="aof-section aof-{{name}}-section" fxLayout="row" fxLayoutAlign="center center">
            <div class="aof-section-container" fxFlex fxFlex.gt-sm="960px">
                <h2 *ngIf="title">{{title}}</h2>
                <p *ngIf="description">{{description}}</p>
                <div class="aof-section-content">
                    <ng-content></ng-content>
                </div>
            </div>
        </section>
    `,
    styleUrls: ['./content-section.component.scss']
})
export class ContentSectionComponent {

    @Input() name: string;
    @Input() title?: string;
    @Input() description?: string;
}


