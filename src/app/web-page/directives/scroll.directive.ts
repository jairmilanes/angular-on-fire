import {Directive, EventEmitter, HostListener, OnDestroy, Output} from '@angular/core';
import {AofScrollEvent} from '../interfaces';
import {ScrollService} from '../services/scroll.service';
import {Subscription} from 'rxjs';


@Directive({
    selector: "[scroll-directive]"
})
export class ScrollDirective implements OnDestroy {

    /**
     * Scroll event emitter
     */
    @Output() onScroll = new EventEmitter<AofScrollEvent>();

    private listener: Subscription;

    constructor(private service: ScrollService) {
        this.listener = this.onScroll
            .subscribe((e: AofScrollEvent) => this.service.update(e));
    }

    /**
     * Scroll event listener
     * @param event
     */
    @HostListener("scroll", ["$event"])
    onListenerTriggered(event: any): void {

        const {scrollTop, scrollLeft, scrollHeight, clientHeight} = event.target;

        // Calculate the scroll percentage
        const percentage = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);

        // Only update if has changed
        if(this.service.top() !== scrollTop){

            // Emit the event
            this.onScroll.emit({
                percentage,
                top: scrollTop,
                left: scrollLeft,
                target: event.target
            });
        }
    }

    ngOnDestroy() {
        this.listener.unsubscribe();
    }
}


