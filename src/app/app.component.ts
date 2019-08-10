import {Component, AfterViewChecked, HostListener, AfterViewInit, OnChanges} from '@angular/core';
import {CodeHighlightService} from './highlight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  preserveWhitespaces: true
})
export class AppComponent implements AfterViewChecked, OnChanges {
  title = 'angular-on-fire';

  highlighted: boolean;
  innerHeight: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight;
  }

  constructor(private highlightService: CodeHighlightService) {}

  ngAfterViewChecked() {
    if (!this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnChanges() {
    if (window) {
      this.innerHeight = window.innerHeight;
    }
  }

  stringfy(object: any) {
    return JSON.stringify(object, null, 4);
  }
}
