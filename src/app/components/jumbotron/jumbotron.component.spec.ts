import {TestBed, ComponentFixture} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FlamesComponent} from '../flames/flames.component';
import {JumbotronComponent } from './jumbotron.component';
import {BrowserModule} from '@angular/platform-browser';


describe('Jumbotron', () => {

  let fixture: ComponentFixture<JumbotronComponent>;
  let instance: JumbotronComponent;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        FlexLayoutModule
      ],
      declarations: [
        FlamesComponent,
        JumbotronComponent
      ],
    });

    fixture = TestBed.createComponent(JumbotronComponent);
    instance = fixture.debugElement.componentInstance;
  }));

  it('should create a Jumbotron', () => {
    expect(instance).toBeTruthy();
  });

  it('should contain the Angular Logo', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.aof-angular-logo img').src).toContain('assets/angular-logo-large.png');
  });

  it('should have a title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.aof-jumbotron > div h1').textContent).toBeTruthy();
  });

  it('should have a description', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.aof-jumbotron > div p').textContent).toBeTruthy();
  });

  it('should have a main action wth correct url', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.aof-jumbotron > div a').href)
        .toEqual('https://github.com/layoutzweb/angular-on-fire');
  });
});
