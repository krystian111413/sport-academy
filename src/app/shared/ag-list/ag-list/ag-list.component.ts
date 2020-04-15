import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColDef, ColumnApi, GridApi} from 'ag-grid-community';

export enum AgFilterTypes {
  string = 'agStringColumnFilter',
  date = 'agDateColumnFilter',
  number = 'agNumberColumnFilter'
}

export interface AgGridApi {
  type: string;
  api: GridApi;
  columnApi: ColumnApi;
}

@Component({
  selector: 'ag-list',
  templateUrl: './ag-list.component.html',
  styleUrls: ['./ag-list.component.scss']
})
export class AgListComponent {
  @Input() items: any[];
  @Input() columnDefs: ColDef[] = [];
  @Input() showProgressBar = true;
  @Input() icon?: string;
  @Input() headerTitle: string;
  @Input() sizeColumnsToFit = true;
  @Output() selectionChanged: EventEmitter<AgGridApi> = new EventEmitter();
  @Output() agGridApi: EventEmitter<AgGridApi> = new EventEmitter<AgGridApi>();
  private gridApi: AgGridApi;

  onFirstDataRendered(agGridApi: AgGridApi): void {
    // Auto size columns to fit viewport width
    if (this.sizeColumnsToFit) {
      agGridApi.api.sizeColumnsToFit();
    }
    this.agGridApi.emit(agGridApi);
  }

  onGridReady(agGridApi: AgGridApi): void {
    this.gridApi = agGridApi;
  }

  fitColumns(): void {
    this.gridApi.api.sizeColumnsToFit();
  }

  restoreColumns(): void {
    this.gridApi.columnApi.resetColumnState();
  }

  downloadAsCSV(): void {
    this.gridApi.api.exportDataAsCsv();
  }
}
