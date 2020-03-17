import {Injectable} from '@angular/core';
import {CrudService} from "../../../core/crud/services/crud.service";
import {Employee} from "../models/employee";
import {RestService} from "../../../core/services/rest/rest.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends CrudService<Employee, any> {


  constructor(restService: RestService,
              private httpClient: HttpClient) {
    super(restService, 'api/v1/employees');
  }

  addEmployee(instanceCreateDto: any): Observable<Employee> {
    return  this.httpClient.post<Employee>(`${environment.apiUrl}${this.path}`, instanceCreateDto);
  }

  uploadFileForEmployee(selectedFile: any, id: string): Observable<any> {
    const  fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this.httpClient.post(`${environment.apiUrl}${this.path}/${id}/file`, fd)
  }

  downloadFile(id: string): Observable<string> {
    return this.restService.get<string>(`${this.path}/${id}/file`);
    // window.open(`${environment.apiUrl}${this.path}/${id}/file`);
  }


}
