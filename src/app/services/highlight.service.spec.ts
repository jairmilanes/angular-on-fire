import {TestBed} from '@angular/core/testing';
import {CodeHighlightService} from './highlight.service';

describe('CodeHighlightService', () => {

    let service: CodeHighlightService;

    beforeEach((() => {
        TestBed.configureTestingModule({
            providers: [
                CodeHighlightService
            ],
        });

        service = TestBed.get(CodeHighlightService);
    }));

    it('should create a content-section', () => {
        expect(service).toBeTruthy();
    });
});
