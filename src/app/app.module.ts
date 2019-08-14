import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WebPageModule} from './web-page/web-page.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    WebPageModule,
    AppRoutingModule,
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule {}
