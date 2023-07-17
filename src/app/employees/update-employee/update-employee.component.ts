import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { HttpProviderService } from 'src/app/services/http-provider.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  @Input() employeesAllList: any;
  @Input() selectedEmpId: any;

  updEmployeeUpdateForm: employeeForm = new employeeForm();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;
  isSubmitted: boolean = false;
  fetchValue: any;
  constructor(private router: Router,
    private httpProvider: HttpProviderService,
    private http: HttpClient,
    private apiService: APIService
  ) { }

  ngOnInit(): void { 
    this.fetchEmpValues(this.selectedEmpId);
  }

  fetchEmpValues(empId:any){
    console.log(empId);
    console.log(this.employeesAllList);
    this.fetchValue = this.employeesAllList[empId];
    console.log(this.updEmployeeUpdateForm);
    this.updEmployeeUpdateForm['id'] = this.fetchValue.id;
    this.updEmployeeUpdateForm.firstName = this.fetchValue.firstName;
    this.updEmployeeUpdateForm.lastName = this.fetchValue.lastName;
    this.updEmployeeUpdateForm.department = this.fetchValue.department;
    this.updEmployeeUpdateForm.doj = this.fetchValue.doj;

  }
  
  updateEmployee(isValid: any) {
    console.log(isValid);
    let arrayToJson = JSON.stringify(this.updEmployeeUpdateForm);
    const dataToArray = JSON.parse(arrayToJson);
    this.isSubmitted = true;
    if (isValid) {
      this.employeesAllList.push(dataToArray);
      localStorage.setItem("userData", JSON.stringify(this.employeesAllList));
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



