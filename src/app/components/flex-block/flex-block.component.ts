import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';


@Component({
    selector: 'app-flex-block',
    template: `
        <div class="aof-flex-box" [ngClass]="classNames" fxLayout="column" fxLayout.gt-sm="row" fxLayoutAlign="center center">
            <figure *ngIf="image">
                <img src="assets/{{image}}" [alt]="title || ''" />
            </figure>
            <div>
                <h3 *ngIf="title">{{title}}</h3>
                <p *ngIf="content">{{content}}</p>
            </div>
        </div>
    `,
    styleUrls: ['./flex-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FlexBlockComponent implements OnInit {

    @Input() name: string;
    @Input() image?: string;
    @Input() title?: string;
    @Input() content?: string;

    classNames: {[name: string]: boolean} = {};

    ngOnInit(): void {
        if (this.name) {
            this.classNames[`aof-flex-block-${this.name}`] = true;
        }
    }

}
