import {Injectable} from '@angular/core';
import {RestService} from "../../services/rest/rest.service";
import {Observable} from "rxjs";
import {Project} from "../models/project";

@Injectable()
export class ProjectSelectorService {

  constructor(private restService: RestService) {}

  getAll(): Observable<Project[]> {
    return this.restService.get<Project[]>('api/v1/projects');
  }
}
