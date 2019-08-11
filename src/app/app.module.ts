import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLinkedinIn, faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { CodeBlockComponent } from './components/code-block.component';
import { FlamesComponent } from './components/flames/flames.component';
import { FlexBlockComponent } from './components/flex-block/flex-block.component';
import { ContentSectionComponent } from './components/content-section/content-section.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { FooterComponent } from './components/footer/footer.component';
import { CodeHighlightService } from './services/highlight.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentSectionComponent,
    FlamesComponent,
    FlexBlockComponent,
    FooterComponent,
    JumbotronComponent,
    CodeBlockComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FlexLayoutModule,
    FontAwesomeModule
  ],
  providers: [
    CodeHighlightService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(
        faLinkedinIn,
        faGithubAlt
    );
  }
}
