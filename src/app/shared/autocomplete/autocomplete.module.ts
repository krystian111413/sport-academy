import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutocompleteComponent} from './autocomplete.component';
import {MatAutocompleteModule, MatButtonModule, MatIconModule, MatInputModule, MatOptionModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [AutocompleteComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,

        // Material
        MatAutocompleteModule,
        MatOptionModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [AutocompleteComponent]
})
export class AutocompleteModule {
}
