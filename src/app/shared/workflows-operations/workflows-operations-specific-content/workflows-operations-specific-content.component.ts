import {Component, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {ProcessParameter} from "../models/entity-configuration";

@Component({
    selector: 'workflows-operation-specific-content',
    templateUrl: './workflows-operations-specific-content.component.html',
    styleUrls: ['./workflows-operations-specific-content.component.scss'],
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WorkflowsOperationsSpecificContentComponent), multi: true},
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => WorkflowsOperationsSpecificContentComponent), multi: true}
        ]

})
export class WorkflowsOperationsSpecificContentComponent implements ControlValueAccessor, OnChanges, Validator {

    @Input() processParameters: ProcessParameter[];
    objectForm: FormGroup = new FormGroup({});
    private change: any;


    registerOnChange(fn: any): void {
        this.change = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.objectForm = new FormGroup({});
        if (this.processParameters) {
            if (this.processParameters.length === 0) {
                this.objectForm.updateValueAndValidity();
                this.change(this.objectForm.value);
            }
            this.processParameters.forEach(param => {
                if (param.type === 'boolean') {
                    this.objectForm.addControl(param.name, new FormControl(false, Validators.required));
                } else {
                    this.objectForm.addControl(param.name, new FormControl('', Validators.required));
                }
            });
            this.objectForm.valueChanges.subscribe(value => {
                this.change(this.objectForm.value);
            });
        }
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.processParameters && this.processParameters.length === 0) {
            return null;
        }
        return this.objectForm.valid ? null : {
            error: {
                valid: false
            }
        };
    }
}
