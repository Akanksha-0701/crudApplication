import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { HttpProviderService } from '../services/http-provider.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { APIService } from '../services/api.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(
    public modal: NgbActiveModal
  ) { }
}
const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  closeResult = '';
  employeeList: any = [];
  public employeesCount: number = 0;
  getSuccessMsg: any;
  clickedAddEmp: boolean = false;
  clickedUpdateEmp: boolean = false;
  clickedDelEmp: boolean = false;
  selectedEmployeeId: any;

  constructor(private router: Router,
    private modalService: NgbModal,
    private apiService: APIService,
    private httpProvider: HttpProviderService,
  ) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    // Retrieve the list of employees from the storage
    const getDataFromStorage = localStorage.getItem("userData");
    console.log("data: ", getDataFromStorage);

    if (getDataFromStorage) {
      this.employeeList = JSON.parse(getDataFromStorage);
      this.employeesCount = this.employeeList.length;
    }
    else {
      this.httpProvider.getAllEmployee().subscribe((data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          console.log(resultData);
          if (resultData) {
            this.employeeList = resultData;
            this.employeesCount = this.employeeList.length;
          }
        }
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.employeeList = [];
              }
            }
          }
        });
    }
  }

  addEmployee() {
    this.clickedAddEmp = true;
    this.clickedUpdateEmp = false;
    this.clickedDelEmp = false;
  }

  deleteEmployeeConfirmation(employee: any) {
    this.clickedDelEmp = true;
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteEmployee(employee);
      },
        (reason) => { });
  }

  deleteEmployee(employee: any) {
    // this.employeeList
    delete this.employeeList[employee.id];
    console.log(this.employeeList);
    localStorage.setItem("userData", JSON.stringify(this.employeeList));
    this.reload();
    /* this.httpProvider.deleteEmployeeById(employee.id).subscribe((data : any) => {
       if (data != null && data.body != null) {
         var resultData = data.body;
         if (resultData != null && resultData.isSuccess) {
           this.getSuccessMsg = resultData.message;
           console.log(this.getSuccessMsg);
           this.getAllEmployee();
         }
       }
     },
     (error : any) => {});*/
  }

  editEmployee(empId: any) {
    console.log(empId);
    this.selectedEmployeeId = empId;
    this.clickedUpdateEmp = true;
    this.clickedAddEmp = false;
    this.clickedDelEmp = false;

  }
  reload() {
    this.getAllEmployee();
  }
}
