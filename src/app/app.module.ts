import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CodeHighlightService} from './highlight.service';
import {CodeBlockComponent} from './components/code-block.component';
import {FireAnimationComponent} from './components/fire-animation.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    CodeBlockComponent,
    FireAnimationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [
    CodeHighlightService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
