import {ComponentFixture, async, TestBed} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FlamesComponent} from './flames.component';
import {ChangeDetectionStrategy} from '@angular/core';


describe('Flames', () => {

    let fixture: ComponentFixture<FlamesComponent>;
    let instance: FlamesComponent;
    let compiled: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule
            ],
            declarations: [
                FlamesComponent
            ],
        }).overrideComponent(FlamesComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default },
        });

        fixture = TestBed.createComponent(FlamesComponent);
        instance = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;
    }));

    it('should create', () => {
        expect(instance).toBeDefined();
    });

    it('should contain 3 flame layers', () => {
        expect(compiled.querySelectorAll('.aof-flame').length).toEqual(4);
    });

    it('should set the id', () => {
        instance.id = 'test';
        fixture.detectChanges();
        expect(compiled.querySelector('.aof-fire-test')).toBeTruthy();
    });

    it('should be set to small', () => {
        instance.size = 'small';
        fixture.detectChanges();
        expect(compiled.querySelector('.aof-fire-small')).toBeTruthy();
    });

    it('should be set to medium', () => {
        instance.size = 'medium';
        fixture.detectChanges();
        expect(compiled.querySelector('.aof-fire-medium')).toBeTruthy();
    });

    it('should be set to large', () => {
        instance.size = 'large';
        fixture.detectChanges();
        expect(compiled.querySelector('.aof-fire-large')).toBeTruthy();
    });

    it('should be set to slow speed', () => {
        instance.speed = 'slow';
        fixture.detectChanges();
        expect(compiled.querySelector('.aof-fire-slow')).toBeTruthy();
    });

    it('should be set to normal speed', () => {
        instance.speed = 'normal';
        fixture.detectChanges();
        expect(compiled.querySelector('.aof-fire-normal')).toBeTruthy();
    });

    it('should be set to fast speed', () => {
        instance.speed = 'fast';
        fixture.detectChanges();
        expect(compiled.querySelector('.aof-fire-fast')).toBeTruthy();
    });
});
