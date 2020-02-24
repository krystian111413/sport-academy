import {ColDef} from 'ag-grid-community';
import {OnDestroy, OnInit} from '@angular/core';
import {OnSelectedProject} from "../../core/project-selector/services/on-selected-project";

export abstract class WorkflowsOperationConfig<INSTANCE> extends OnSelectedProject implements OnInit, OnDestroy {
  items: INSTANCE[];
  columns: ColDef[] = [];

  async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.columns = this.defineColumnsDisplayedOnFirstStep();
    this.putCheckbox();
    this.items = await this.getItems();

  }

  async onProjectSelected(): Promise<void> {
    this.items = undefined;
    this.items = await this.getItems();
  }

  abstract defineColumnsDisplayedOnFirstStep(): ColDef[];

  abstract getItems(): Promise<INSTANCE[]>;

  private putCheckbox(): void {
    const column = this.columns[0];
    column.checkboxSelection = true;
    column.headerCheckboxSelection = true;
    column.headerCheckboxSelectionFilteredOnly = true;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.removeCheckbox();

  }

  private removeCheckbox(): void {
    const column = this.columns[0];
    column.checkboxSelection = false;
    column.headerCheckboxSelection = false;
    column.headerCheckboxSelectionFilteredOnly = false;
  }
}
