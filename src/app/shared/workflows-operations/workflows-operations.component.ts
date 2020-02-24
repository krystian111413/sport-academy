import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {WorkflowsOperationsRequestsService} from "./services/workflows-operations-requests.service";
import {WorkflowsConfigEntityService} from "./services/workflows-config-entity.service";
import {EntityConfiguration, ProcessParameter, WorkflowConfig} from "./models/entity-configuration";
import {OnSelectedProject} from "../../core/project-selector/services/on-selected-project";
import {ProjectSelectorEventEmitterService} from "../../core/project-selector/services/project-selector-event-emitter.service";

export interface Entity {
  id: string;
  projectName: string;
}

export interface PayloadForWorkflowsOperation {
  entityType: string;
  dagId: string;
  entities: Entity[];
  processParameters: any;
}

@Component({
  selector: 'workflows-operations',
  templateUrl: './workflows-operations.component.html',
  styleUrls: ['./workflows-operations.component.scss']
})
export class WorkflowsOperationsComponent extends OnSelectedProject implements OnInit {
  listFormGroup: FormGroup;
  operationFormGroup: FormGroup;
  specificForActionFormGroup: FormGroup;
  workflowsConfigType: EntityConfiguration;
  @ViewChild('stepper', {static: false})
  stepper: MatHorizontalStepper;

  @Input() items: any[];
  @Input() columnsDef: any;
  @Input() entityConfigurationName: string;
  @Output() confirm: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private location: Location,
              private workflowsOperationsRequestsService: WorkflowsOperationsRequestsService,
              private workflowsConfigEntityService: WorkflowsConfigEntityService,
              projectSelectorEventEmitterService: ProjectSelectorEventEmitterService) {
    super(projectSelectorEventEmitterService);
    this.listFormGroup = this.formBuilder.group({
      selectedElements: [[], Validators.required]
    });
    this.operationFormGroup = this.formBuilder.group({
      operation: ['', Validators.required]
    });
    this.specificForActionFormGroup = this.formBuilder.group({
      payloadForRequest: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.workflowsConfigEntityService.getWorkflowsConfigType(this.entityConfigurationName).subscribe(value => {
      this.workflowsConfigType = value;
    });
  }

  toJson(obj: any): string {
    return JSON.stringify(obj);
  }

  onConfirm(): void {
    const payload = this.specificForActionFormGroup.value['payloadForRequest'];
    const selectedWorkflow: WorkflowConfig = this.getSelectedWorkflow();
    this.workflowsOperationsRequestsService.request({
      dagId: selectedWorkflow.dagId,
      entities: this.getEntities(),
      processParameters: payload,
      entityType: this.entityConfigurationName
    }).subscribe(value => {
      this.toastrService.success('Your Request is being processed');
      this.location.back();
    }, error => {
      this.toastrService.error('Process was rejected!');
    });
    this.confirm.emit(payload);
  }

  resetThirdAndLastStep(stepper: MatHorizontalStepper): void {
    stepper.steps.toArray()[2].reset();
    stepper.steps.last.reset();
  }

  getProcessParametersFromSelectedWorkflow(): ProcessParameter[] {
    const selectedWorkflow = this.getSelectedWorkflowName();
    if (this.workflowsConfigType && selectedWorkflow) {
      return this.workflowsConfigType.workflows.find(value => value.name === selectedWorkflow).processParameters;
    }
  }

  getSelectedWorkflowName(): string {
    return this.operationFormGroup.value['operation'];

  }

  getSelectedWorkflowCaption(): string {
    if (this.workflowsConfigType && this.getSelectedWorkflowName()) {
      return this.getSelectedWorkflow().caption;
    }
  }

  private getSelectedWorkflow(): WorkflowConfig {
    return this.workflowsConfigType.workflows.find(value => value.name === this.getSelectedWorkflowName());
  }

  getCountOfSelectedElements(): number {
    const selectedElements: string[] = this.listFormGroup.value['selectedElements'];
    return selectedElements ? selectedElements.length : 0;
  }

  getSpecificOperationPayload() {
    const payload = this.specificForActionFormGroup.value['payloadForRequest'];
    return payload ? payload : {};
  }

  onProjectSelected(): void {
    this.stepper.reset();
  }

  private getEntities(): Entity[] {
    const ids: string[] = this.listFormGroup.value.selectedElements;

    return ids.map(id => {
      return {
        id: id,
        projectName: this.items.find(value => value.id === id).projectName
      };
    });
  }
}
