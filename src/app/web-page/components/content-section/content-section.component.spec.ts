import {TestBed, ComponentFixture} from '@angular/core/testing';
import { ContentSectionComponent } from './content-section.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('ContentSection', () => {

  const componentName = 'my-section';
  let fixture: ComponentFixture<ContentSectionComponent>;
  let instance: ContentSectionComponent;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule
      ],
      declarations: [
        ContentSectionComponent
      ],
    });

    fixture = TestBed.createComponent(ContentSectionComponent);
    instance = fixture.debugElement.componentInstance;
  }));

  it('should create a content-section', () => {
    instance.name = componentName;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(fixture).toBeTruthy();
    expect(compiled.querySelector('.aof-my-section-section')).toBeTruthy();
  });

  it('should set a title', () => {
    instance.name = componentName;
    instance.title = 'My Section Title';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(instance.title);
  });

  it('should set a description', () => {
    instance.name = 'my-section';
    instance.description = 'My Section Description';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(instance.description);
  });
});
