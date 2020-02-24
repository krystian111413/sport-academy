import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {AgGridApi} from '../../ag-list/ag-list/ag-list.component';

@Component({
    selector: 'workflows-operations-list',
    templateUrl: './workflows-operations-list.component.html',
    styleUrls: ['./workflows-operations-list.component.scss'],
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WorkflowsOperationsListComponent), multi: true},
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => WorkflowsOperationsListComponent), multi: true}
    ]

})
export class WorkflowsOperationsListComponent implements OnInit, ControlValueAccessor, Validator {

    change: any;
    @Input() columns: ColDef[] = [];
    @Input() items: any[];
    agGridApi: AgGridApi;

    ngOnInit(): void {
    }

    registerOnChange(fn: any): void {
        this.change = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
        if (this.agGridApi) {
            this.agGridApi.api.deselectAll();
        }
    }

    onChange(selectedRows: any[]): void {
        if (this.change) {
            this.change(selectedRows.map(value => value['id']));
        }
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return (this.agGridApi && this.agGridApi.api.getSelectedRows().length > 0) ? null : {
            error: {
                valid: false
            }
        };
    }

}
