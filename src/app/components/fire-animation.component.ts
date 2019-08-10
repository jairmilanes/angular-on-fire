import {Component, Input, OnChanges, ViewEncapsulation} from '@angular/core';


@Component({
    selector: 'app-fire-animation',
    template: `
        <div class="aof-fire-animation" [ngClass]="classNames">
            <div class="aof-flames">
                <div class="aof-flame"></div>
                <div class="aof-flame"></div>
                <div class="aof-flame"></div>
                <div class="aof-flame"></div>
            </div>
        </div>
    `,
    styleUrls: ['../fire-animation.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FireAnimationComponent implements OnChanges {

    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    @Input() speed: 'slow' | 'normal' | 'fast' = 'normal';
    @Input() id: string;

    classNames: any = {};

    ngOnChanges() {
        this.classNames = {
            'aof-fire-small': this.size === 'small',
            'aof-fire-medium': this.size === 'medium',
            'aof-fire-large': this.size === 'large',
            'aof-fire-slow': this.speed === 'slow',
            'aof-fire-normal': this.speed === 'normal',
            'aof-fire-fast': this.speed === 'fast',
        };

        if (this.id) {
            this.classNames[`aof-fire-${this.id}`] = true;
        }
    }
}
