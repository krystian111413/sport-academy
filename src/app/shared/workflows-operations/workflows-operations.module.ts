import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkflowsOperationsComponent} from './workflows-operations.component';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {WorkflowsOperationsListComponent} from './workflows-operations-list/workflows-operations-list.component';
import {AgListModule} from '../ag-list/ag-list.module';
import {WorkflowsOperationsOperationsComponent} from './workflows-operations-operations/workflows-operations-operations.component';
import {WorkflowsOperationsSpecificContentComponent} from './workflows-operations-specific-content/workflows-operations-specific-content.component';
import {MatInputModule} from '@angular/material/input';
import {WorkflowsOperationsRequestsService} from './services/workflows-operations-requests.service';
import {WorkflowsConfigEntityService} from './services/workflows-config-entity.service';
import {DatePickerModule} from "../date-picker/date-picker.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgxJsonViewerModule} from "ngx-json-viewer";


@NgModule({
    declarations: [WorkflowsOperationsComponent, WorkflowsOperationsListComponent, WorkflowsOperationsOperationsComponent, WorkflowsOperationsSpecificContentComponent],
    exports: [
        WorkflowsOperationsComponent
    ],
    imports: [
        CommonModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatListModule,
        AgListModule,
        FormsModule,
        MatInputModule,
        DatePickerModule,
        MatSlideToggleModule,
        NgxJsonViewerModule,
    ],
    providers: [
        WorkflowsOperationsRequestsService,
        WorkflowsConfigEntityService
    ]
})
export class WorkflowsOperationsModule { }
