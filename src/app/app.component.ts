import {Component, AfterViewChecked} from '@angular/core';
import {CodeHighlightService} from './services/highlight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  preserveWhitespaces: true
})
export class AppComponent implements AfterViewChecked {

  title = 'angular-on-fire';
  highlighted: boolean;

  constructor(private highlightService: CodeHighlightService) {}

  ngAfterViewChecked() {
    if (!this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  toString(object: any) {
    return JSON.stringify(object, null, 4);
  }
}


