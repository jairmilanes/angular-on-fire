import {Component, ElementRef, Input} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ScrollService} from '../../services/scroll.service';


@Component({
    selector: 'app-scroll-top',
    template: `
        <div class="aof-scroll-top" *ngIf="on$ | async">
            <a href="#top" (click)="scrollTo($event)">
                <fa-icon [icon]="['fas', 'angle-up']" size="2x"></fa-icon>
            </a>
        </div>
    `,
    styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent {

    @Input() target: ElementRef;

    on$: Observable<boolean>;

    constructor(private scroll: ScrollService) {
        this.on$ = this.scroll.position$.pipe(map((e) => e.top > 300))
    }

    scrollTo(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        const {offsetTop, offsetLeft} = this.target.nativeElement;
        this.scroll.scrollTo({ left: offsetLeft, top: offsetTop});
    }
}
