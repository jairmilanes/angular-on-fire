import { NgModule} from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

const { GCLOUD_PROJECT, FUNCTIONS_EMULATOR } = process.env;
const { firebase } = environment;

/**
 * Little hack to set the base ref correctly when running `firebase serve` locally.
 */
const BASE_HREF = '/'.concat(
    FUNCTIONS_EMULATOR && GCLOUD_PROJECT ? [GCLOUD_PROJECT, firebase.region, 'ssrServer'].join('/') : ''
);

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    FlexLayoutServerModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: BASE_HREF }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
