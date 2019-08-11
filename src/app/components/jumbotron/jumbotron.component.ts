import {ChangeDetectionStrategy, Component, HostListener, OnChanges, ViewEncapsulation} from '@angular/core';


@Component({
    selector: 'app-jumbotron',
    templateUrl: './jumbotron.component.html',
    styleUrls: ['./jumbotron.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class JumbotronComponent implements OnChanges {

    innerHeight: number;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerHeight = window.innerHeight;
    }

    ngOnChanges() {
        if (window) {
            this.innerHeight = window.innerHeight;
        }
    }
}

