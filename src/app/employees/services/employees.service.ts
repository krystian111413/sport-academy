import {Injectable} from '@angular/core';
import {CrudService} from "../../core/crud/services/crud.service";
import {Employee} from "../models/employee";
import {RestService} from "../../core/services/rest/rest.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends CrudService<Employee, any> {

  constructor(restService: RestService,
              private httpClient: HttpClient) {
    super(restService, 'employees');
  }

  getAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('assets/employees.json');
  }

}
