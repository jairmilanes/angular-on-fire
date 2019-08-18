import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChangeDetectionStrategy} from '@angular/core';
import {FooterComponent} from './footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


describe('FlexBox', () => {

    let fixture: ComponentFixture<FooterComponent>;
    let instance: FooterComponent;
    let compiled: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule,
                FontAwesomeModule
            ],
            declarations: [
                FooterComponent
            ],
        }).overrideComponent(FooterComponent, {
            set: {changeDetection: ChangeDetectionStrategy.Default},
        });

        fixture = TestBed.createComponent(FooterComponent);
        instance = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;
    }));

    it('should create', () => {
        expect(instance).toBeDefined();
    });

    it('should display content in 100% in mobile', () => {
        expect(compiled.querySelector('.aof-footer-container').getAttribute('fxFlex')).toEqual('');
    });

    it('should restrain content to correct width on web', () => {
        expect(compiled.querySelector('.aof-footer-container').getAttribute('fxFlex.gt-sm')).toEqual('960px');
    });

    it('should center content', () => {
        expect(compiled.querySelector('.aof-footer').getAttribute('fxlayoutalign')).toEqual('center center');
        expect(compiled.querySelector('.aof-footer').getAttribute('fxlayout')).toEqual('row');
    });

    it('should contain a linked-in link', () => {
        expect(compiled.querySelector('.aof-linkedin-action')).toBeTruthy();
        expect(compiled.querySelector('.aof-linkedin-action').href).toEqual('https://www.linkedin.com/in/jmilanes/');
    });

    it('should contain a github link', () => {
        expect(compiled.querySelector('.aof-github-action')).toBeTruthy();
        expect(compiled.querySelector('.aof-github-action').href).toEqual('https://github.com/layoutzweb/angular-on-fire');
    });
});
