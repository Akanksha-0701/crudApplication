import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';

const AUTH_API = 'http://localhost:4200/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', 'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }),
  observe: "response" as 'body'
};
@Injectable({
  providedIn: 'root'
})
export class APIService {
  isValidEmployee: boolean = false;
  employeeName: any;
  employeeList: any;


  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  get(url: string): Observable<any> {
    return this.http.get(url, httpOptions).pipe(map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }

  post(url: string, model: any) {
    /* const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       }), 
      observe: "response" as 'body'
     };
     return this.http.post(
       url,
       model,
       httpOptions)
       .pipe(
         map((response: any) => this.ReturnResponseData(response)),
         catchError(this.handleError)
       );*/

    const options = { Headers, responseType: 'json' as 'blob' };
    this.http.put(url, model, options).subscribe(
      data => {
        console.log(data);
        return data;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );


  }
  private ReturnResponseData(response: any) {
    return response;
  }
  private handleError(error: any) {
    return throwError(error);
  }


  validEmp() {
    return {
      userName: "akanksha",
      password: "admin",
    }
  }

  validEmployee(isEmp: boolean) {
    this.isValidEmployee = isEmp;
  }

  getValidEmp() {
    return this.isValidEmployee;
  }

  setEmpLoggedIn(empName: string) {
    this.employeeName = empName;
    //this.employeeName = localStorage.setItem("userLoggedIn", empName);

  }

  getEmpLoggedIn() {
    return this.employeeName;
  }

  setEmpList(empList: any) {
    this.employeeList = empList;
  }

  getEmpList() {
    return this.employeeList;
  }

}
