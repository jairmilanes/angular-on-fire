import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {CodeHighlightService} from '../services/highlight.service';
import {Meta, Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';



@Component({
    selector: 'app-web-page',
    templateUrl: './web-page.component.html',
    styleUrls: ['./web-page.component.scss']
})
export class WebPageComponent implements OnInit, AfterViewChecked {

    highlighted: boolean;
    config: any;
    defaults = {
        title: 'Angular On Fire',
        description: 'Pre-Configured Angular Project with RxJs, Firebase, Cypress, Jest and Server Side Rendering.',
        social: {
            facebook: false,
            twitter: false
        }
    };

    constructor(private highlightService: CodeHighlightService,
                private title: Title,
                private meta: Meta) {
        this.config = {...this.defaults, ...(environment.page || {})};
    }

    ngOnInit(): void {
        this.seo();
    }

    ngAfterViewChecked() {
        if (!this.highlighted) {
            this.highlightService.highlightAll();
            this.highlighted = true;
        }
    }

    toString(object: any) {
        return JSON.stringify(object, null, 4);
    }

    seo(): void {
        const {title, description, url, social} = this.config;

        // Site metadata
        this.title.setTitle(title);
        this.meta.addTag({name: 'description', content: description});

        if (social) {
            if (social.twitter) {
                // Twitter metadata
                this.meta.addTag({name: 'twitter:card', content: 'summary'});
                this.meta.addTag({name: 'twitter:site', content: '@AngularUniv'});
                this.meta.addTag({name: 'twitter:title', content: this.title.getTitle()});
                this.meta.addTag({name: 'twitter:description', content: description});
                this.meta.addTag({name: 'twitter:text:description', content: description});
                // this.meta.addTag({name: 'twitter:image', content: 'https://avatars3.githubusercontent.com/u/16628445?v=3&s=200'});
            }

            if (social.facebook) {
                // Facebook metadata
                this.meta.addTag({name: 'og:url', content: url});
                this.meta.addTag({name: 'og:type', content: 'website'});
                this.meta.addTag({name: 'og:title', content: this.title.getTitle()});
                this.meta.addTag({name: 'og:description', content: this.config.description});
                // this.meta.addTag({name: 'og:image', content: description});
            }
        }
    }
}