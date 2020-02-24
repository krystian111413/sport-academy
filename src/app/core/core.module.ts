import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule} from '@angular/material';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AutocompleteModule} from "../shared/autocomplete/autocomplete.module";

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatIconModule,
        SharedModule,
        MatListModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        AutocompleteModule,
        MatInputModule,
    ],
    declarations: [BreadcrumbsComponent],
    exports: [BreadcrumbsComponent]
})
export class CoreModule {
}
