import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { HttpProviderService } from 'src/app/services/http-provider.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: employeeForm = new employeeForm();
  @Input() employeesAllList: any;

  @ViewChild("employeeForm")
  employeeForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(private router: Router,
    private httpProvider: HttpProviderService,
    private http: HttpClient,
    private apiService: APIService
  ) { }

  ngOnInit(): void { }

  addEmployee(isValid: any) {
    if (this.employeesAllList) {
      const lastElement = this.employeesAllList[this.employeesAllList.length - 1];
      let lastId = +lastElement.id;
      if (lastId !== undefined) {
        this.addEmployeeForm.id = lastId + 1;
      }
      else {
        this.addEmployeeForm.id = 0;
      }
      let arrayToJson = JSON.stringify(this.addEmployeeForm);
      const dataToArray = JSON.parse(arrayToJson);
      this.isSubmitted = true;
      if (isValid) {
        this.employeesAllList.push(dataToArray);
        localStorage.setItem("userData", JSON.stringify(this.employeesAllList));
      }
      /* this.httpProvider.addEmployee(this.addEmployeeForm).subscribe(async data => {
         if (data != null && data.body != null) {
           if (data != null && data.body != null) {
             var resultData = data.body;
             if (resultData != null && resultData.isSuccess) {
               setTimeout(() => {
                 this.router.navigate(['/Home']);
               }, 500);
             }
           }
         }
       },
         async error => {
           setTimeout(() => {
             this.router.navigate(['/Home']);
           }, 500);
         });*/
    }
    else {
      this.employeesAllList = [];
    }
  }
}

export class employeeForm {
  firstName: string = "";
  lastName: string = "";
  department: string = "";
  doj: any = formatDate(new Date());
  id: any = "";
}

function formatDate(data: any) {
  let date = data.toJSON().slice(0, 10);
  let nDate = date.slice(8, 10) + '/'
    + date.slice(5, 7) + '/'
    + date.slice(0, 4);
  return nDate;
}


