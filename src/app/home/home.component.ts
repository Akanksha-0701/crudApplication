import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggeduserName: string | undefined;
  loggedIn: boolean = false;

  constructor(private apiService: APIService, private router:Router) { }

  ngOnInit(): void {
    //this.loggedIn = true;
    if(this.apiService.getEmpLoggedIn()){
      this.loggedIn = true;
      this.loggeduserName = this.apiService.getEmpLoggedIn();
    }
    else{
      this.loggedIn = false;
      this.redirectLoginPage();
    }
    
  }
  redirectLoginPage() {
    this.router.navigate(['./login']);
  }

}
