import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    userName:['', [Validators.required]],
    emailId:['', [Validators.required]],
    password:['', [Validators.required]],
    phoneNumber:['', [Validators.required]],
  })

  user:User = {};
 
  registerFunction(){
    this.backendService.registerUser(this.user).subscribe((response:User)=>{
      this.user.emailId = response.emailId;
      this.user.userName = response.userName;
      this.user.password = response.password; 
      this.user.phoneNumber = response.phoneNumber; 
      this.user.role = response.role;
      this.user.hasVoted = response.hasVoted;
      this.user.candidate = response.candidate;
      this._snackBar.open('Congrats!!You have registered', 'Successfully', {
        duration: 1800,
        panelClass: ['mat-toolbar', 'mat-primary']
      });  
      this.router.navigateByUrl("login")
    },(error: HttpErrorResponse) => {
      this._snackBar.open("Registration failed! User Already Exists", "", {
        duration: 1800,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }
    )
  }

  resetFunction(){
    this.registrationForm.reset(); 
  }

  loginRoutefunc(){
    this.router.navigateByUrl("login")
  }

  constructor(private backendService:BackendService, private fb:FormBuilder, private _snackBar: MatSnackBar, private router:Router) { }
  
  ngOnInit(): void {
  }

}
