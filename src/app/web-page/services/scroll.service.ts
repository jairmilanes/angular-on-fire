import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {AofScrollEvent} from '../interfaces';
import {Injectable} from '@angular/core';
import {pluck} from 'rxjs/operators';

@Injectable()
export class ScrollService {

    top$: Observable<number>;
    left$: Observable<number>;
    percentage$: Observable<number>;
    position$: Observable<AofScrollEvent>;
    private current: BehaviorSubject<AofScrollEvent>;

    constructor() {
        this.current = new BehaviorSubject<AofScrollEvent>({
            top: 0,
            left: 0,
            percentage: 0,
            target: null
        });
        this.position$ = this.current.asObservable();
        this.top$ = this.position$.pipe(pluck('top'));
        this.left$ = this.position$.pipe(pluck('left'));
        this.percentage$ = this.position$.pipe(pluck('percentage'));
    }

    subscribe(callback: (e: AofScrollEvent) => void): Subscription {
        return this.current.asObservable().subscribe(callback);
    }

    update(event: AofScrollEvent) {
        this.current.next(event);
    }

    top() {
        return this.current.getValue().top;
    }

    left() {
        return this.current.getValue().left;
    }

    percentage() {
        return this.current.getValue().percentage;
    }

    scrollTo(config: any): void {
        const {target} = this.current.getValue();

        if (target) {
            target.scrollTo({behavior: 'smooth', ...config});
        }
    }
}
