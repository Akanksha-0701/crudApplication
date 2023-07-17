import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-summary',
  templateUrl: './employee-summary.component.html',
  styleUrls: ['./employee-summary.component.css']
})
export class EmployeeSummaryComponent {
  @Input() public empCount: number | undefined;
  constructor(
    
  ) { }

  ngOnInit(): void {
    console.log(this.empCount);
  }

}
