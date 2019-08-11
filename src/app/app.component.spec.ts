import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CodeBlockComponent} from './components/code-block.component';
import {FlamesComponent} from './components/flames/flames.component';
import {FlexBlockComponent} from './components/flex-block/flex-block.component';
import {JumbotronComponent} from './components/jumbotron/jumbotron.component';
import {ContentSectionComponent} from './components/content-section/content-section.component';
import {FooterComponent} from './components/footer/footer.component';
import {CodeHighlightService} from './services/highlight.service';
import { AppComponent } from './app.component';

const serviceMock = {
  highlightAll: jest.fn()
};

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let instance: AppComponent;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FlexLayoutModule,
        FontAwesomeModule
      ],
      declarations: [
        AppComponent,
        CodeBlockComponent,
        FlamesComponent,
        FlexBlockComponent,
        JumbotronComponent,
        ContentSectionComponent,
        FooterComponent
      ],
      providers: [
        {provide: CodeHighlightService, useValue: serviceMock }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    instance = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(instance).toBeTruthy();
  });

  it(`should have as title 'angular-on-fire'`, () => {
    expect(instance.title).toEqual('angular-on-fire');
  });
});
