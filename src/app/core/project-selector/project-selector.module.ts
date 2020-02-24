import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {ProjectSelectorComponent} from './components/project-selector/project-selector.component';
import {ProjectSelectorService} from "./services/project-selector.service";
import {ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";

@NgModule({
    declarations: [ProjectSelectorComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule
  ],
    exports: [ProjectSelectorComponent],
    providers: [ProjectSelectorService, CookieService]
})
export class ProjectSelectorModule {
}
