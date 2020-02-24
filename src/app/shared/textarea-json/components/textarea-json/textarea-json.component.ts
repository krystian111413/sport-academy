import {Component, ElementRef, forwardRef, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {JsonPipe} from '@angular/common';

@Component({
    selector: 'textarea-json',
    templateUrl: './textarea-json.component.html',
    styleUrls: ['./textarea-json.component.scss'],
    providers: [
        JsonPipe,
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaJsonComponent), multi: true}
    ]
})
export class TextareaJsonComponent implements OnInit, ControlValueAccessor {
    @ViewChild('jsonPre', {static: false}) jsonPre: ElementRef;

    public json: object = {};

    private onChange;

    constructor(
        private jsonPipe: JsonPipe
    ) {
    }

    public ngOnInit(): void {
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public writeValue(jsonAsString: string): void {
        if (!jsonAsString || !jsonAsString.length) {
            return;
        }

        const json = JSON.parse(jsonAsString);

        if (json) {
            this.json = json;
        }
    }

    public removeHTMLTags(event: KeyboardEvent): boolean {
        if (event.keyCode === 13) {
            document.execCommand('insertHTML', false, '\n');
            return false;
        }

        return true;
    }

    public emitChanges(): void {
        this.onChange(this.jsonPre.nativeElement.innerHTML.replace(/\s/g, ''));
    }

    public formatJson(): void {
        setTimeout(() => {
            try {
                this.jsonPre.nativeElement.innerHTML = this.jsonPipe.transform(JSON.parse(this.jsonPre.nativeElement.innerHTML));
                this.jsonPre.nativeElement.scrollLeft = 0;
                this.jsonPre.nativeElement.scrollTop = 0;
            } catch (e) {

            }
        });
    }
}
