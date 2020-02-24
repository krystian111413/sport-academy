import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {WorkflowConfig} from "../models/entity-configuration";

@Component({
    selector: 'workflows-operations-operations',
    templateUrl: './workflows-operations-operations.component.html',
    styleUrls: ['./workflows-operations-operations.component.scss'],
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WorkflowsOperationsOperationsComponent), multi: true}]
})
export class WorkflowsOperationsOperationsComponent implements ControlValueAccessor {
    @Input() workflows: WorkflowConfig[] = [];
    change: any;
    workflowSelected: WorkflowConfig;

    registerOnChange(fn: any): void {
        this.change = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
        this.workflowSelected = obj;
    }

    onSelect(): void {
        this.change(this.workflowSelected);
    }
}
