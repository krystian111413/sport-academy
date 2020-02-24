import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgListComponent} from './ag-list/ag-list.component';
import {AgGridModule} from 'ag-grid-angular';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../shared.module';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
    declarations: [AgListComponent],
    exports: [
        AgListComponent
    ],
  imports: [
    CommonModule,
    AgGridModule,
    MatProgressBarModule,
    MatCardModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    FlexModule,
    MatTooltipModule
  ]
})
export class AgListModule { }
