import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ContentSectionComponent} from '../components/content-section/content-section.component';
import {FlamesComponent} from '../components/flames/flames.component';
import {FlexBlockComponent} from '../components/flex-block/flex-block.component';
import {FooterComponent} from '../components/footer/footer.component';
import {JumbotronComponent} from '../components/jumbotron/jumbotron.component';
import {CodeBlockComponent} from '../components/code-block.component';
import {CodeHighlightService} from '../services/highlight.service';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faGithubAlt, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {WebPageComponent} from './web-page.component';
import {PageNotFoundComponent} from './page/not-found/not-found.component';


@NgModule({
    declarations: [
        WebPageComponent,
        PageNotFoundComponent,
        ContentSectionComponent,
        FlamesComponent,
        FlexBlockComponent,
        FooterComponent,
        JumbotronComponent,
        CodeBlockComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule
    ],
    providers: [
        CodeHighlightService
    ],
    exports: [
        WebPageComponent,
        PageNotFoundComponent
    ]
})
export class WebPageModule {
    constructor() {
        library.add(
            faLinkedinIn,
            faGithubAlt
        );
    }
}
