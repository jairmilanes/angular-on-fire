import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChangeDetectionStrategy} from '@angular/core';
import {FlexBlockComponent} from './flex-block.component';


describe('FlexBox', () => {

    let fixture: ComponentFixture<FlexBlockComponent>;
    let instance: FlexBlockComponent;
    let compiled: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule
            ],
            declarations: [
                FlexBlockComponent
            ],
        }).overrideComponent(FlexBlockComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default },
        });

        fixture = TestBed.createComponent(FlexBlockComponent);
        instance = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;
    }));

    it('should create', () => {
        expect(instance).toBeDefined();
    });

    it('should have mobile layout set to column', () => {
        expect(compiled.querySelector('.aof-flex-box').getAttribute('fxlayout')).toEqual('column');
    });

    it('should have other layouts set to row', () => {
        expect(compiled.querySelector('.aof-flex-box').getAttribute('fxlayout.gt-sm')).toEqual('row');
    });

    it('should align content correctly', () => {
        expect(compiled.querySelector('.aof-flex-box').getAttribute('fxlayoutalign')).toEqual('center center');
    });

    it('should contain a title', () => {
        instance.title = 'test';
        fixture.detectChanges();
        expect(compiled.querySelector('.aof-flex-box > div > h3')).toBeTruthy();
        expect(compiled.querySelector('.aof-flex-box > div > h3').textContent).toEqual('test');
    });

    it('should contain content', () => {
        instance.content = 'test';
        fixture.detectChanges();
        expect(compiled.querySelector('.aof-flex-box > div > p')).toBeTruthy();
        expect(compiled.querySelector('.aof-flex-box > div > p').textContent).toEqual('test');
    });
});
