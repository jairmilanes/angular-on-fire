import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';


describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let instance: AppComponent;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    instance = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(instance).toBeTruthy();
  });
});
