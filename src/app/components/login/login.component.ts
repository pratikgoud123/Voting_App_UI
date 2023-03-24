import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { BackendService } from 'src/app/services/backend.service';
import { loginResponse } from '../../model/loginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  [x: string]: any;
  loginForm = this.fb.group({
    emailId:['', [Validators.required]],
    password:['', [Validators.required]],
  })

  user:User = {};

  loginFunction(){
    this.backendService.login(this.user).subscribe((response:loginResponse)=>{
      this.user.emailId = response.user?.emailId;
      this.user.role = response.user?.role;
      console.log(response);
      this.backendService.captureEmail(response.user?.emailId, response.user?.hasVoted);      //to capture emailId in backendService
      if(this.user.role==="admin"){
        this.router.navigateByUrl("admin-page")
        this._snackBar.open('logged in!!', 'successfully',{
          duration: 1800,
           panelClass: ['mat-toolbar', 'mat-primary']
         }
        ) 
      }else if (this.user.role==="user") {
        this.router.navigateByUrl("voting-page")
        this._snackBar.open('logged in!!', 'successfully',{
          duration: 1800,
           panelClass: ['mat-toolbar', 'mat-primary']
         }
        ) 
      } 
      }, (error)=>{alert ('please enter valid credentials')}
    )
  }

  resetFunction(){
    this.loginForm.reset();
  }

  registerRoutefunc(){
    this.router.navigateByUrl("register")
  }

  show: boolean = false;
  password() {
    this.show = !this.show;
  }

  constructor(private backendService:BackendService, private fb:FormBuilder, private router:Router, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }

}
