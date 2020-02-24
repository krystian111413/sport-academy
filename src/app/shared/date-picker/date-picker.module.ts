import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDatepickerModule, MatIconModule, MatInputModule} from '@angular/material';
import {DatePickerComponent} from './date-picker.component';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [DatePickerComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatDatepickerModule,
        MatInputModule,
        MatButtonModule,
        FlexLayoutModule
    ],
    exports: [DatePickerComponent]
})
export class DatePickerModule {
}
