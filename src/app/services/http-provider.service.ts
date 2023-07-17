import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from './api.service';

var apiUrl = "http://localhost:4200/";

let httpLink = {
  getAllEmployee: apiUrl + "assets/api/getAllEmployee.json",
  deleteEmployeeById: apiUrl + "assets/api/deleteEmployeeById.json",
  getEmployeeDetailById: apiUrl + "assets/api/getEmployeeDetailById",
  addEmployee: apiUrl + "src/assets/api/getAllEmployee.json"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private apiService: APIService) { }

  public getAllEmployee(): Observable<any> {
    return this.apiService.get(httpLink.getAllEmployee);
  }

  public getEmployeeDetailById(model: any): Observable<any> {
    return this.apiService.get(httpLink.getEmployeeDetailById + '?id=' + model);
  }
  public addEmployee(model: any) {
    return this.apiService.post(httpLink.addEmployee, model);
  } 
  public saveEmployee(model: any) {
    return this.apiService.post(httpLink.addEmployee, model);
  } 
  //public deleteEmployeeById(model: any): Observable<any> {
    //return this.apiService.post(httpLink.deleteEmployeeById + '?id=' + model, "");
  //  }
}                          