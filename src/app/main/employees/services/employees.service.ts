import {Injectable} from '@angular/core';
import {CrudService} from '../../../core/crud/services/crud.service';
import {Employee} from '../models/employee';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends CrudService<Employee, any> {


  constructor(private httpClient: HttpClient) {
    super(httpClient, 'api/v1/employees');
  }

  addEmployee(instanceCreateDto: any): Observable<Employee> {
    return  this.httpClient.post<Employee>(`${this.path}`, instanceCreateDto);
  }

  uploadFileForEmployee(selectedFile: any, id: string): Observable<any> {
    const  fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this.httpClient.post(`${this.path}/${id}/file`, fd)
  }

  downloadFile(id: string): Observable<string> {
    return this.httpClient.get<string>(`${this.path}/${id}/file`);
    // window.open(`${environment.apiUrl}${this.path}/${id}/file`);
  }


}
