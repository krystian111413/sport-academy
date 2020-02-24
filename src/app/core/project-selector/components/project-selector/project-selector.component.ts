import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/project';
import {ProjectSelectorService} from "../../services/project-selector.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RestService} from "../../../services/rest/rest.service";
import {CookieService} from "ngx-cookie-service";
import {ProjectSelectorEventEmitterService} from "../../services/project-selector-event-emitter.service";

@Component({
  selector: 'project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss']
})
export class ProjectSelectorComponent implements OnInit {
  projects: Project[] = [];
  formGroup: FormGroup;
  public static readonly SELECTED_PROJECT_KEY = 'selectedProject';

  constructor(private projectSelectorService: ProjectSelectorService,
              private cookieService: CookieService,
              projectSelectorEventEmitterService: ProjectSelectorEventEmitterService,
              formBuilder: FormBuilder,
              restService: RestService) {
    this.formGroup = formBuilder.group({
      projectSelected: [this.getSelectedProject()]
    });
    this.formGroup.get('projectSelected').valueChanges.subscribe(selectedProjectName => {
      restService.setProjectHeader(selectedProjectName);
      cookieService.set(ProjectSelectorComponent.SELECTED_PROJECT_KEY, selectedProjectName);
      projectSelectorEventEmitterService.emit(selectedProjectName);
    });
  }

  ngOnInit() {
    this.projectSelectorService.getAll().subscribe(
      projects => this.projects = projects
    );
  }

  private getSelectedProject(): string {
    return this.cookieService.get(ProjectSelectorComponent.SELECTED_PROJECT_KEY);
  }
}
