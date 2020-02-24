import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextareaJsonComponent} from './components/textarea-json/textarea-json.component';

@NgModule({
    declarations: [TextareaJsonComponent],
    imports: [
        CommonModule
    ],
    exports: [
        TextareaJsonComponent
    ]
})
export class TextareaJsonModule {
}
