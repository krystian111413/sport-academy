import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {map} from 'rxjs/operators';

@Component({
    selector: 'autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutocompleteComponent), multi: true}]

})
export class AutocompleteComponent implements ControlValueAccessor {
    @Input() placeholder: string;
    @Input() options: string[] = [];

    public formControl: FormControl = new FormControl();
    public filteredOptions: Observable<string[]>;

    private onChange;

    constructor() {
        this.filteredOptions = this.formControl.valueChanges
            .pipe(
                map(value => this.filter(value))
            );
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public writeValue(value: string): void {
        this.formControl.setValue(value);
    }

    public onOptionSelect(event: MatAutocompleteSelectedEvent): void {
        this.onChange(event.option.value);
    }

    public clear(): void {
        this.formControl.setValue('');
        this.onChange(undefined);
    }

    private filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

}
