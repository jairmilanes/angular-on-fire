import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-code-block',
    template: `
        <pre class="aof-code-block"><code class="language-{{language}}">
            <ng-content></ng-content>
        </code></pre>
    `,
    styles: [
        'code, pre { white-space: pre; }',
        'pre { margin-bottom: 20px; }'
    ],
    preserveWhitespaces: true
})
export class CodeBlockComponent {

    @Input() language: string;
}

