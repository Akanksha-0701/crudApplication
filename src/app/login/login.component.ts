import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isFormValid: boolean = true;
  submitted: boolean = false;

  loginForm:FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private apiService: APIService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = false;
  }

 /* onSubmit1() {
    this.submitted = true;
    console.log(this.loginForm);
    if(this.loginForm.username == null || this.loginForm.password == null){
      //form is not valid
      this.isFormValid = false;
    }
    else{
      this.isFormValid = true;
      
     // this.isLoginFailed = false;
      //this.isLoggedIn = true;
      this.redirectHomePage();
    this.apiService.login(this.loginForm.username, this.loginForm.username).subscribe(
      data => {
       // this.tokenStorage.saveToken(data.accessToken);
      //  this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
       // this.roles = this.tokenStorage.getUser().roles;
        this.redirectHomePage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    }
  }*/
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.controls.userName.value == null){
      //form is not valid
      this.isFormValid = false;
    }
    else{
      this.isFormValid = true;
      if((this.loginForm.controls.userName.value === this.apiService.validEmp().userName) &&(this.loginForm.controls.password.value === this.apiService.validEmp().password)){
        this.apiService.validEmployee(true);
        this.apiService.setEmpLoggedIn(this.loginForm.controls.userName.value);
        this.redirectHomePage();
       
      }else{
        this.loginForm.reset();
        this.apiService.validEmployee(false);
      }
    } 
  }
  
  redirectHomePage() {
    this.router.navigate(['./home']);
  }

}
