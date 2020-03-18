import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material';
import {MAT_DATE_FORMATS} from "@angular/material/core";

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
    selector: 'date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]
})
export class DatePickerComponent implements ControlValueAccessor {

    @Input() placeholder: string;
    @Input() isRequired = false;
    @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'legacy';
    public date = new FormControl();
    public onChange;

    constructor() {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
        if (this.isRequired){
            this.date = new FormControl(obj ? new Date(obj) : '', Validators.required);
        }else {
            this.date = new FormControl(obj ? new Date(obj) : '');
        }
    }

    public onChangeListener(event: MatDatepickerInputEvent<any>): void {
        const date = new Date(event.value);
        if (event.value) {
          this.onChange(date.toJSON());
        }else {
          this.onChange(null);
        }
        // this.onChange(new Date(event.value).toLocaleDateString());
    }

}
